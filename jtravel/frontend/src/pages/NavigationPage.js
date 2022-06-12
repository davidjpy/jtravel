import './NavigationPage.css'
import React, { useState, useEffect } from 'react';
import videoBg from '../assets/videos/japan_bg2kTrim.mp4'
import { Checkbox } from '@mui/material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';

import useGetUser from '../hooks/useGetUser';

function NavigationPage() {

  const getUser = useGetUser();

  const [muted, setMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const handleToggleMute = (event) => {
    setMuted(event.target.checked);
    event.target.checked ? setMuted(true) : setMuted(false)
  };

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
          <div>
            <Checkbox checked={muted} onChange={handleToggleMute}
              icon={<VolumeUpOutlinedIcon fontSize='large' color='disabled' />} checkedIcon={<VolumeOffOutlinedIcon fontSize='large' color='disabled' />}
              sx={{ position: 'fixed', top: 75, right: 25 }} />
            <video src={videoBg} autoPlay loop muted={muted} />
          </div>
        )}
    </>
  );
};

export default NavigationPage;