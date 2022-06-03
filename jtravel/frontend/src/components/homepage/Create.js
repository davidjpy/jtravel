import React, { useState } from 'react';
import {
  Tooltip,
  Fab,
  Modal,
  Fade,
  Typography,
  Backdrop,
  alpha,
  TextField,
  Box,
  Button,
  Avatar,
} from '@mui/material'
import moment from 'moment'
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FaceRetouchingNaturalRoundedIcon from '@mui/icons-material/FaceRetouchingNaturalRounded';

import axiosInstance from '../../utils/Axios';

const create_URL = 'api/public/thread/';

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  position: 'fixed',
  color: 'white',
  backgroundColor: '#455a64',
  '&:hover': {
    backgroundColor: '#b0bec5'
  },
  [theme.breakpoints.up('md')]: {
    right: 'calc(25% + 75px)',
    bottom: 40,
  },
  [theme.breakpoints.down('md')]: {
    right: 'calc(50% - 25px)',
    bottom: 20,
  },
}));

const CreateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  gap: '30px',
  position: 'absolute',
  top: '50%',
  left: '49.5%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 420,
  backgroundColor: alpha('#37474f', 0.90),
  borderRadius: '16px',
  boxShadow: 24,
  padding: theme.spacing(7)
}));

const LoginTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#263238',
    },
    '&:hover fieldset': {
      borderColor: '#2979ff',
    },
    input: { color: 'white' },
    backgroundColor: '#263238'
  }
});

function Create({ auth, setThreadCounter }) {

  const { username, profile_image } = auth;
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  const currentDate = new Date().toLocaleString('en-US', options)

  const toggleCreateWindow = () => {
    setOpenCreate(!openCreate);
  };

  const handleUploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const updateThreadCounter = (e) => {
    setThreadCounter(e + 1)
  };

  const handleCreateThread = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('alt', content);
      formData.append('image', image);
      formData.append('content', content);
      formData.append('created', moment().format('YYYY-MM-DDThh:mm:ss'));
      await axiosInstance.post(create_URL, formData, {
        headers: 
        {
          'content-type': 'multipart/form-data'
        }
      });
      updateThreadCounter();
    }
    catch (err) {
      console.error(err);
    };
  };  

  return (
    <>
      <StyledTooltip title='Create'>
        <Fab aria-label='create' onClick={toggleCreateWindow}>
          <EditIcon />
        </Fab>
      </StyledTooltip>
      <Modal aria-labelledby='create' aria-describedby='create' open={openCreate} onClose={toggleCreateWindow}
        disableRestoreFocus closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 0 }}>
        <Fade in={openCreate}>
          <CreateBox>
            <Typography variant='h4' color='white'>
              Create a Thread...
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Avatar src={profile_image} sx={{ height: 50, width: 50, ml: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', color: 'white', fontSize: 13, color: '#82b1ff' }}>
                  <PersonIcon fontSize='small' sx={{ mr: 0.5, color: 'white' }} />{username}</Typography>
                <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', color: 'white', fontSize: 13, color: '#82b1ff' }}>
                  <EventNoteRoundedIcon fontSize='small' sx={{ mr: 0.5, color: 'white' }} />{currentDate}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <LoginTextField label='Content' variant='outlined' placeholder='Writing something about Japan......' autoFocus
                onChange={e => setContent(e.target.value)} multiline rows={5} 
                InputLabelProps={{ style: { color: 'white' } }} inputProps={{ style: { color: 'white' } }} />
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Button variant='contained' component='label' disableElevation color='info'
                  sx={{ textTransform: 'none', width: '5%', borderRadius: 0 }}>
                  <FaceRetouchingNaturalRoundedIcon fontSize='small' />
                  <input type='file' hidden />
                </Button>
                <Button startIcon={<AddPhotoAlternateIcon />} variant='contained' component='label' color='success' disableElevation
                  sx={{ fontSize: 16, textTransform: 'none', width: '100%', borderRadius: 0 }}>
                  <input type='file' multiple accept='image/*' hidden onChange={handleUploadImage} />
                  Upload Image
                </Button>
              </Box>
            </Box>
            <Button variant='contained' color='inherit' startIcon={<PostAddIcon />} onClick={async () => { await handleCreateThread(); toggleCreateWindow(); }}
              sx={{ height: 52, fontSize: 18, textTransform: 'none' }}>
              Post
            </Button>
          </CreateBox>
        </Fade>
      </Modal>
    </>
  );
};

export default Create;


