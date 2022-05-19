import * as React from 'react';
import { Stack, Box } from '@mui/material';

import Thread from '../components/homepage/Thread';
import Social from '../components/homepage/Social';
import Suggest from '../components/homepage/Suggest';

function HomePage() {

  return (
    <Box sx={{ bgcolor: '#fafafa' }}>
      <Stack direction='row' justifyContent='space-between'>
        <Suggest />
        <Thread />
        <Social />
      </Stack>
    </Box>
  );
};

export default HomePage;