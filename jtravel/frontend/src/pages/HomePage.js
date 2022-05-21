import * as React from 'react';
import { Stack, Box } from '@mui/material';

import Thread from '../components/homepage/Thread';
import Social from '../components/homepage/Social';
import Suggest from '../components/homepage/Suggest';
import Create from '../components/homepage/Create';

function HomePage() {

  return (
    <Box bgcolor={'background.default'} color={'text.primary'}>
      <Stack direction='row' justifyContent='space-between'>
        <Suggest />
        <Thread />
        <Social />
      </Stack>
      <Create />
    </Box>
  );
};

export default HomePage;