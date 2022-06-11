import React from 'react';
import {
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'sticky',
  alignSelf: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-start',
  top: 0,
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const StyleTypography = styled(Typography)({
  '&:hover': {
    color: '#616161',
    textDecoration: 'underline'
  }
});

function Social({ auth }) {

  const { username, name, profile_image } = auth;

  return (
    <StyledBox paddingTop={10} flex={2} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mt: 3, ml: 4, display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Avatar src={profile_image} sx={{ height: 130, width: 130 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>      
          <Typography variant='caption' sx={{ fontSize: 24 }}>Welcome to J-Travel! </Typography>
          <Typography variant='caption' sx={{ fontSize: 14 }}>@{username}</Typography>
          <Typography variant='caption' sx={{ fontSize: 14 }}>@{name}</Typography>
          <Link to='/profile' style={{ fontSize: 15, color: '#2979ff', textTransform: 'none' }}>
            Check out your profile!
          </Link>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 6, mt: 4 }}>
        <StyleTypography variant='body2' sx={{ fontSize: 12, color: '#9e9e9e' }}>
          <a href='https://www.jnto.go.jp/'>- News & Travel Restriction in Japan</a>
        </StyleTypography>
        <StyleTypography variant='body2' sx={{ fontSize: 12, color: '#9e9e9e' }}>
          <a href='https://www.hk.emb-japan.go.jp/itprtop_en/index.html'>
            - HK to Japan Travel Advisory</a>
        </StyleTypography>
        <StyleTypography variant='body2' sx={{ fontSize: 12, color: '#9e9e9e' }}>
          <a href='https://twitter.com/japan'>
            - Japan Gov Twitter</a>
        </StyleTypography>
        <Typography variant='body2' sx={{ ml: 1, mt: 2, fontSize: 12, color: '#9e9e9e' }}>
          &copy; Copyright 2022 J-Travel
        </Typography>
      </Box>
    </StyledBox>
  );
};

export default Social;