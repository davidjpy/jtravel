import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  AvatarGroup,
  Badge,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { faker } from '@faker-js/faker';

import ablum from '../../assets/images/album.jpg'

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'sticky',
  alignSelf: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-end',
  top: 0,
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      content: '""',
    },
  },
}));

function Suggest() {

  const theme = useTheme();
  const [avatar, setAvatar] = useState([]);
  const [gallery, setGallery] = useState([]);

  const handleActiveUsers = () => {
    const image = [];
    for (var i = 0; i < 12; i++) {
      image.push(faker.image.avatar());
    };
    setAvatar(image)
  };

  const handleFeatureGallery = () => {
    const data = [];
    for (var i = 0; i < 8; i++) {
      data.push({
        'image': faker.image.city(400, 400, true),
        'name': faker.address.cityName(),
        'address': faker.address.city(),
        'author': faker.name.findName()
        })
    };
    setGallery(data);
  }

  useEffect(() => {
    handleActiveUsers();
    handleFeatureGallery();
  }, []);

  const logger = () => {
    console.log(gallery)
  }

  return (
    <StyledBox paddingTop={10} flex={2}>
      <Box sx={{ mt: 1, mr: 2 }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          Active Users
        </Typography>
        <AvatarGroup max={11} total={28}
          sx={{ padding: 0 }}>
          {avatar.map((item, index) => (
            <StyledBadge
              key={index}
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot">
              <Avatar src={item} />
            </StyledBadge>
          ))}
        </AvatarGroup>
        <Typography variant='h6' sx={{ mt: 3, mb: 1 }}>
          Featured Gallery
        </Typography>
        <ImageList sx={{ width: 400, height: 450, borderRadius: '16px' }}>
          {gallery.map((item, index) => (
            <ImageListItem key={index}>
              <img src={item.image}
                alt={item.address}
                loading='lazy' />
              <ImageListItemBar
                title={item.name}
                subtitle={item.author}
                actionIcon={
                  <IconButton onClick={logger}
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.name}`}>
                    <InfoIcon />
                  </IconButton>
                } />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography variant='h6' sx={{ mt: 3, mb: 1 }}>
          Hot J-Pop Music
        </Typography>
        <Card sx={{ display: 'flex', borderRadius: '16px', width: 400 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6">
                Pale Blue
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                よねづけんし Yonezu Kenshi
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
              </IconButton>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
              </IconButton>
            </Box>
          </Box>
          <CardMedia component="img" image={ablum} sx={{ width: 151, ml: 'auto' }} alt="Live from space album cover" />
        </Card>
      </Box>
    </StyledBox>
  );
};

export default Suggest;


