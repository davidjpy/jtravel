import React, { useState } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ThreadBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  top: '52%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'auto',
  borderRadius: '16px',
  boxShadow: 24,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

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
      <ImageList cols={3} rowHeight='auto' sx={{ mt: 2, width: 920, paddingBottom: 5, overflow: 'unset' }}>
        {profileThread.map((item) => (
          <ThreadItem key={item.image} {...item} />
        ))}
      </ImageList>
    </StyledBox>
  );
};

export default Media;

function ThreadItem({ image, alt, username, profile_image, content, created }) {

  const [hover, setHover] = useState(false);
  const [openThread, setOpenThread] = useState(false);

  const toggleThreadWindow = () => {
    setOpenThread(!openThread);
  };

  return (
    <>
      <Modal open={openThread} onClose={toggleThreadWindow} aria-labelledby='thread-details' aria-describedby='thread-action'
        disableAutoFocus closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openThread}>
          <ThreadBox>
            <Card sx={{ borderRadius: '16px', height: 'auto', width: 600 }}>
              <CardHeader
                titleTypographyProps={{ fontSize: 18 }}
                avatar={<Avatar src={profile_image}
                  sx={{ height: 45, width: 45 }} />}
                action={<IconButton aria-label='settings'><MoreVertIcon /></IconButton>}
                title={username}
                subheader={created} />
              <CardMedia component='img' image={image} height='auto' />
              <CardContent>
                <Typography variant='body2'>
                  {content}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
              </CardActions>
            </Card>
          </ThreadBox>
        </Fade>
      </Modal>
      <ImageListItem sx={{ padding: 0.5 }}>
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
                transform: 'scale(1.1, 1.1)',
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
  );
};