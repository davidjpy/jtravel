import React from 'react';
import { Box, ImageList, ImageListItem, BottomNavigation, BottomNavigationAction, Divider } from '@mui/material';
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

function Media() {

  const [focus, setFocus] = React.useState(0);

  return (
    <StyledBox paddingTop={2}>
      <BottomNavigation
        showLabels
        value={focus}
        onChange={(event, newValue) => { setFocus(newValue); }}>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <Divider sx={{ width: 912, bgcolor: '#263238', mb: 1 }}/>
      <ImageList cols={2} rowHeight='auto' sx={{ width: 920, overflow: 'unset' }}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{ padding: 0.5 }}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </StyledBox>
  );
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
];

export default Media;