import React from 'react';
import { Box } from '@mui/material';

import Info from '../components/profile/Info';
import Media from '../components/profile/Media';

function ProfilePage() {

  return (
    <Box bgcolor='background.default' color='text.primary' sx={{ display: 'flex' }}>
      <Box flex={1} />
      <Box flex={2} sx={{ position: 'flex', flexDirection: 'column' }}>
        <Info />
        <Media />
      </Box>
      <Box flex={1} />
    </Box>
  );
};

export default ProfilePage;