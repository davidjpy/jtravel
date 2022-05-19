import './NavigationPage.css'
import * as React from 'react';
import videoBg from '../assets/videos/japan_bg2kTrim.mp4'
import { Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';

function NavigationPage() {

  const [muted, setMuted] = React.useState(true);
  const handleToggleMute = (event) => {
    setMuted(event.target.checked);
    event.target.checked ? setMuted(true) : setMuted(false)
  }

  return (
    <div>
      <Checkbox checked={muted} onChange={handleToggleMute}
        icon={<VolumeUpOutlinedIcon fontSize='large' color='disabled'/>} checkedIcon={<VolumeOffOutlinedIcon fontSize='large' color='disabled'/>}
        sx={{ position: "fixed", top: 75, right: 25 }} />
      <video src={videoBg} autoPlay loop muted={muted}/>
    </div>
  );
}

export default NavigationPage;