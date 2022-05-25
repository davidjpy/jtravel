import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import Info from '../components/profile/Info';
import Media from '../components/profile/Media';
import useGetUser from '../hooks/useGetUser';
import useAuth from '../hooks/useAuth';
import useProfileThread from '../hooks/useProfileThread';

function ProfilePage() {

  const getUser = useGetUser();
  const getThread = useProfileThread();
  const { auth, profileThread } = useAuth();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const verifyContent = async () => {
      try {
        await getUser();
        await getThread();
      }
      catch (err) {
        console.error(err);
      }
      finally {
        setIsLoading(false);
      };
    };
    verifyContent();
  }, []);


  return (
    <>
      {isLoading ? (
        <p>isLoading...</p>
      ) : (
        <Box flex={2} bgcolor={'background.default'} color={'text.primary'}
          sx={{ display: 'flex', flexDirection: 'column' }}>
          <Info auth={auth.user} />
          <Media profileThread={profileThread.profilethread} />
        </Box>
      )};
    </>
  );
};

export default ProfilePage;