import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';

import Thread from '../components/homepage/Thread';
import Social from '../components/homepage/Social';
import Suggest from '../components/homepage/Suggest';
import Create from '../components/homepage/Create';
import useAuth from '../hooks/useAuth';
import useGetUser from '../hooks/useGetUser';
import axiosInstance from '../utils/Axios';

const Thread_Url = 'api/public/thread/'

function HomePage() {

  const getUser = useGetUser();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [thread, setThread] = useState([]);
  const [threadCounter, setThreadCounter] = useState(0);

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

  useEffect(() => {
    const verifyContent = async () => {
      try {
        const response = await axiosInstance.get(Thread_Url);
        setThread(response.data);
      }
      catch (err) {
        console.error(err);
      };
    };
    verifyContent();
  }, [threadCounter]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box bgcolor={'background.default'} color={'text.primary'}>
          <Stack direction='row' justifyContent='space-between'>
            <Suggest />
            <Thread thread={thread} />
            <Social />
          </Stack>
          <Create auth={auth.user} threadCounter={threadCounter} setThreadCounter={setThreadCounter} />
        </Box>
      )};
    </>
  );
};

export default HomePage;