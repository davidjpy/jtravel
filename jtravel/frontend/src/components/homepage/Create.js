import React, { useState, useRef, useEffect } from 'react';
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
  Divider,
  Avatar
} from '@mui/material'
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  position: 'fixed',
  color: 'white',
  backgroundColor: '#455a64',
  "&:hover": {
    backgroundColor: "#b0bec5"
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
  height: 550,
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
    input: { color: 'white' },
    backgroundColor: '#263238'
  }
});

function Create() {

  const [openCreate, setOpenCreate] = useState(false);

  const toggleCreateWindow = () => {
    setOpenCreate(!openCreate);
  };

  return (
    <>
      <Modal aria-labelledby='create' aria-describedby='create' open={openCreate} onClose={toggleCreateWindow}
        closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openCreate}>
          <CreateBox>
            <Typography variant='h4' color='white'>
              Create a Thread...
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ height: 45, width: 45, ml: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', color: 'white', fontSize: 13 }}>
                  <PersonIcon fontSize='small' sx={{ mr: 0.5 }} />@davidho</Typography>
                <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', color: 'white', fontSize: 13 }}>
                  <EventNoteRoundedIcon fontSize='small' sx={{ mr: 0.5 }} />@13 May 2022</Typography>
              </Box>
            </Box>
            <LoginTextField label='Content' variant='outlined' placeholder="Writing something about Japan......"
              multiline rows={12} InputLabelProps={{ style: { color: 'white' } }} inputProps={{ style: { color: "white" } }} />
            <Button variant='contained' color='inherit' startIcon={<PostAddIcon />} onClick={() => { handleLogin(); toggleLoginWindow(); }}
              sx={{ height: 52, fontSize: 18, textTransform: 'none' }}>
              Post
            </Button>
          </CreateBox>
        </Fade>
      </Modal>
      <StyledTooltip title='Create'>
        <Fab aria-label='create' onClick={toggleCreateWindow}>
          <EditIcon />
        </Fab>
      </StyledTooltip>
    </>
  );
};

export default Create;