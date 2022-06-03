import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import Info from '../components/profilepage/Info';
import Media from '../components/profilepage/Media';
import useGetUser from '../hooks/useGetUser';
import useAuth from '../hooks/useAuth';
import useProfileThread from '../hooks/useProfileThread';

function ProfilePage() {

  const getUser = useGetUser();
  const getThread = useProfileThread();
  const { auth, profileThread, profileThreadCounter, setProfileThreadCounter } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [tiggerer, setTiggerer] = useState(0)

  useEffect(() => {
    const verifyProfile = async () => {
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
    verifyProfile();
  }, []);

  useEffect(() => {
    const verifyProfile = async () => {
      try {
        await getThread();
      }
      catch (err) {
        console.error(err);
      };
    };
    verifyProfile();
  }, [profileThreadCounter, tiggerer]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box flex={2} bgcolor={'background.default'} color={'text.primary'}
          sx={{ display: 'flex', flexDirection: 'column' }}>
          <Info auth={auth.user} />
          <Media 
            profileThread={profileThread.profilethread}
            profileThreadCounter={profileThreadCounter}
            setProfileThreadCounter={setProfileThreadCounter}
            tiggerer={tiggerer}
            setTiggerer={setTiggerer} />
        </Box>
      )}
    </>
  );
};

export default ProfilePage;