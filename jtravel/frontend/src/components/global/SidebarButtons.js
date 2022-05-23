import * as React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import RestorePageRoundedIcon from '@mui/icons-material/RestorePageRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
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

export const UserIcon = [
  {
    title: 'History',
    path: '/history',
    icon: <RestorePageRoundedIcon />,
  },
  {
    title: 'Liked Posts',
    path: '/liked',
    icon: <FavoriteRoundedIcon />,
  },
  {
    title: 'Saved Posts',
    path: '/saved',
    icon: <LibraryAddRoundedIcon />,
  },
];

export const FunctionIcon = [
  {
    title: 'About',
    path: '/about',
    icon: <PlagiarismRoundedIcon />,
  },
];