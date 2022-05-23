import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

import Info from '../components/profile/Info';
import Media from '../components/profile/Media';
import useGetUser from '../hooks/useGetUser';
import useAuth from '../hooks/useAuth';

function ProfilePage() {

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
        <p>isLoading...</p>
      ) : (
        <Box flex={2} bgcolor={'background.default'} color={'text.primary'}
          sx={{ display: 'flex', flexDirection: 'column' }}>
          <Info auth={auth.user} />
          <Media auth={auth.user} />
        </Box>
      )};
    </>
  );
};

export default ProfilePage;