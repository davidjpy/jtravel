import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import PlagiarismRoundedIcon from '@mui/icons-material/PlagiarismRounded';

export const WebIcon = [
  {
    title: 'Home',
    path: '/home',
    icon: <HomeRoundedIcon />,
  },
  {
    title: 'Explore',
    path: '/explore',
    icon: <ExploreRoundedIcon />,
  },
  {
    title: 'Trending',
    path: '/trending',
    icon: <WhatshotRoundedIcon />,
  },
  {
    title: 'Map',
    path: '/map',
    icon: <AddLocationAltRoundedIcon />,
  }
];

export const FunctionIcon = [
  {
    title: 'About',
    path: '/about',
    icon: <PlagiarismRoundedIcon />,
  },
];