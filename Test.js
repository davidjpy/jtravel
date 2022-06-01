// BackdropProps={{ timeout: 0 }}

// def sample_image_path(instance, filename):
//     path = 'samples/sample_%s' % instance.sample_ID
//     format = instance.image_ID + '.jpg'
//     return os.path.join(path, format)


// sidebar turnery statment ? () : ()

// aria-labelledby='thread-detail'

import React, { useEffect, useState } from 'react';
import { Box, ImageList, ImageListItem, BottomNavigation, BottomNavigationAction, Divider, Modal, Fade, Backdrop, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const LoginBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  gap: '30px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 500,
  backgroundColor: alpha('#37474f', 0.90),
  borderRadius: '16px',
  boxShadow: 24,
  padding: theme.spacing(7)
}));

const itemData = [
  {
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    alt: 'Breakfast',
    title: 'Breakfast',
  },
  {
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    alt: 'Burger',
    title: 'Burger'
  },
]

function Media({ profileThread }) {

  const [focus, setFocus] = useState(0);

  return (
    <StyledBox paddingTop={2}>
      <Divider sx={{ width: 912, borderBottomWidth: 2 }} />
      <BottomNavigation
        showLabels
        value={focus}
        onChange={(event, newValue) => { setFocus(newValue); }}>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <ImageList cols={3} rowHeight='auto' sx={{ mt: 2, width: 920, overflow: 'unset', zIndex: 10 }}>
        {itemData.map((item) => {
          return (
            <Thread key={item.image} {...item} />
          )
        })}
      </ImageList>
    </StyledBox>
  );
};

function Thread({ image, alt }) {

  const [hover, setHover] = useState(false);
  const [openThread, setOpenThread] = useState(false);

  const toggleThreadWindow = () => {
    setOpenThread(!openThread);
  };



  useEffect(() => {
    console.log(hover);
  }, [hover])

  return (
    <>
      <Modal aria-labelledby='thread-details' aria-describedby='thread-action' open={openThread} onClose={toggleThreadWindow}
        closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openThread}>
          <LoginBox>

          </LoginBox>
        </Fade>
      </Modal>
      <ImageListItem sx={{ position: 'relative' }}>
        <img
          src={image}
          alt={alt}
          loading="lazy"
          onMouseOver={() => { setHover(true) }}
          onMouseOut={() => { setHover(false) }}
          onClick={toggleThreadWindow}
          style={
            hover ?
              {
                zIndex: 1,
                transform: 'scale(1.2, 1.2)',
                boxShadow: '20px 20px 15px -4px #000000',
                transition: '0.5s',
                opacity: 0.85,
                cursor: 'pointer'
              } : {
                transition: '0.5s',
              }
          }
        />
      </ImageListItem>
    </>
  )
}

export default Media;

