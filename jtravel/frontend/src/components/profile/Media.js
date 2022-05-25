import React, { useState } from 'react';
import { Box, ImageList, ImageListItem, BottomNavigation, BottomNavigationAction, Divider, Button } from '@mui/material';
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

function Media({ profileThread }) {

  const [focus, setFocus] = useState(0);

  return (
    <StyledBox paddingTop={2}>
      <Divider sx={{ width: 912, borderBottomWidth: 2 }}/>
      <BottomNavigation
        showLabels
        value={focus}
        onChange={(event, newValue) => { setFocus(newValue); }}>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <ImageList cols={3} rowHeight='auto' sx={{ mt: 2, width: 920, overflow: 'unset' }}>
        {profileThread.map((item, index) => (
          <ImageListItem key={index} sx={{ padding: 0.5 }}>
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
            />
          </ImageListItem>  
        ))}
      </ImageList>
    </StyledBox>
  );
};

export default Media;