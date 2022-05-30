import React, { useEffect, useState } from 'react';
import {
  Tooltip,
  Fab,
  Modal,
  Fade,
  Typography,
  Backdrop,
  alpha,
  TextField,
  Box,
  Button,
  Avatar,
  IconButton
} from '@mui/material'
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import FaceRetouchingNaturalRoundedIcon from '@mui/icons-material/FaceRetouchingNaturalRounded';

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  position: 'fixed',
  color: 'white',
  backgroundColor: '#455a64',
  "&:hover": {
    backgroundColor: "#b0bec5"
  },
  [theme.breakpoints.up('md')]: {
    right: 'calc(25% + 75px)',
    bottom: 40,
  },
  [theme.breakpoints.down('md')]: {
    right: 'calc(50% - 25px)',
    bottom: 20,
  },
}));

const CreateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  gap: '30px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 570,
  backgroundColor: alpha('#37474f', 0.90),
  borderRadius: '16px',
  boxShadow: 24,
  padding: theme.spacing(7)
}));

function Create() {

  const [openCreate, setOpenCreate] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);


  const toggleCreateWindow = () => {
    setOpenCreate(!openCreate);
  };

  const logger = () => {
    console.log(images, imageURLs)
  };

  const handleSubmit = (e) => {
    setImages([...e.target.files]);
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach(image => newImageURLs.push(image.srcObject = new MediaStream()));
    setImageURLs(newImageURLs)
  }, [images]);

  return (
    <>
      <ImageList sx={{ width: 500, height: 450 }}>
        <ImageListItem key="Subheader" cols={2}>
        </ImageListItem>
        {itemData.map((item) => (
          <Card key={item.img} {...item} />
      ))}
      </ImageList>
      <StyledTooltip title='Create'>
        <Fab aria-label='create' onClick={toggleCreateWindow}>
          <EditIcon />
        </Fab>
      </StyledTooltip>
      <Modal aria-labelledby='create' aria-describedby='create' open={openCreate} onClose={toggleCreateWindow}
        disableRestoreFocus closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 0 }}>
        <Fade in={openCreate}>
          <CreateBox>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Button variant="contained" component="label"
                  sx={{ textTransform: 'none', width: '5%' }}>
                  <FaceRetouchingNaturalRoundedIcon fontSize='small' />
                  <input type="file" multiple accept='image/*' onChange={handleSubmit} hidden />
                </Button>
              </Box>
            </Box>
            <Button variant='contained' color='inherit' startIcon={<PostAddIcon />} onClick={logger}
              sx={{ height: 52, fontSize: 18, textTransform: 'none' }}>
              Logger
            </Button>
          </CreateBox>
        </Fade>
      </Modal>
    </>
  );
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
]

function Card({ img, title, author }) {

  const [hover, setHover] = useState(false);

  useEffect(() => {
    console.log(hover)
  }, [hover])

  return (
  <ImageListItem key={img}>
    <img
      src={img}
      alt={title}
      loading="lazy"
      onMouseOver={() => { setHover(true ) }}
      onMouseOut={() => { setHover(false) }}
      style={{ transform: hover ? 'scale(1.5, 1.5)' : null }}
    />
    <ImageListItemBar
      title={title}
      subtitle={author}
      actionIcon={
        <IconButton
          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
          aria-label={`info about ${title}`}
        >
          <InfoIcon />
        </IconButton>
      }
    />
  </ImageListItem>)
}

export default Create;