import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';

import Thread from '../components/homepage/Thread';
import Social from '../components/homepage/Social';
import Suggest from '../components/homepage/Suggest';
import Create from '../components/homepage/Create';
import useAuth from '../hooks/useAuth';
import useGetUser from '../hooks/useGetUser';

function HomePage() {

  const getUser = useGetUser();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await getUser();
      }
      catch (err) {
        console.error(err);
      }
      finally {
        setIsLoading(false);
      };
    };
    verifyUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box bgcolor={'background.default'} color={'text.primary'}>
          <Stack direction='row' justifyContent='space-between'>
            <Suggest />
            <Thread />
            <Social />
          </Stack>
          <Create auth={auth.user} />
        </Box>
      )};
    </>
  );
};

export default HomePage;