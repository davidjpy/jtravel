import React, { useState } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import moment from 'moment'
import { styled } from '@mui/material/styles';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SaveIcon from '@mui/icons-material/Save';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import axiosInstance from '../../utils/Axios';

const ThreadBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  top: '52%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'auto',
});

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const EditTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#263238',
    },
  }
});

const StyledCardContent = styled(CardContent)({
  '&:last-child': {
    paddingBottom: 6
  }
})

function Media({ profileThread, profileThreadCounter, setProfileThreadCounter, tiggerer, setTiggerer }) {

  const [focus, setFocus] = useState(0);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const closedeleteAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setDeleteAlert(false);
  };

  return (
    <StyledBox paddingTop={2}>
      <Divider sx={{ width: 912, borderBottomWidth: 2 }} />
      <BottomNavigation
        showLabels
        value={focus}
        onChange={(event, newValue) => { setFocus(newValue); }}>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} sx={{ mr: 5 }} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
      <ImageList cols={3} rowHeight='auto' sx={{ mt: 2, width: 920, paddingBottom: 5, overflow: 'unset' }}>
        {profileThread.map((item) => (
          <ThreadItem
            key={item.image}
            profileThreadCounter={profileThreadCounter}
            setProfileThreadCounter={setProfileThreadCounter}
            tiggerer={tiggerer}
            setTiggerer={setTiggerer}
            setDeleteAlert={setDeleteAlert}
            {...item} />
        ))}
      </ImageList>
      <Snackbar open={deleteAlert} autoHideDuration={2000} onClose={closedeleteAlert}>
        <Alert onClose={closedeleteAlert} severity='error'
          sx={{ bgcolor: '#b71c1c', color: 'white', width: '100%' }}>
          You've Successfully Deleted this Thread
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};

export default Media;

function ThreadItem({ id, image, alt, username, username_display, profile_image, content, created, profileThreadCounter, setProfileThreadCounter, tiggerer, setTiggerer, setDeleteAlert }) {

  const [hover, setHover] = useState(false);
  const [openThread, setOpenThread] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editField, setEditField] = useState(content)
  const [updateAlert, setUpdateAlert] = useState(false);
  const openActionMenu = Boolean(anchorEl);
  
  const closeupdateAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setUpdateAlert(false);
  };

  const toggleThreadWindow = () => {
    setOpenThread(!openThread);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const toggleActionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderEdit = (e) => {
    setTiggerer(e - 1)
  };

  const closeActionMenu = () => {
    setAnchorEl(null);
  };

  const handleThreadUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('alt', editField);
      formData.append('content', editField);
      formData.append('created', moment().format('YYYY-MM-DDThh:mm:ss'));
      await axiosInstance.put(`api/public/thread/${id}/`, formData, {
        headers:
        {
          'content-type': 'multipart/form-data'
        }
      });
      renderEdit(tiggerer);
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Modal open={openThread} onClose={() => { toggleThreadWindow(); setIsEditMode(false); }} aria-labelledby='thread-details' aria-describedby='thread-action'
        disableAutoFocus closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openThread}>
          <ThreadBox>
            <Card sx={{ borderRadius: '16px', height: 'auto', width: 600 }}>
              <CardHeader
                titleTypographyProps={{ fontSize: 18 }}
                avatar={<Avatar src={profile_image}
                  sx={{ height: 45, width: 45 }} />}
                action={isEditMode ? null : <IconButton aria-label='actions' onClick={toggleActionMenu} ><MoreVertIcon size="small"
                  aria-controls={openActionMenu ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openActionMenu ? 'true' : undefined} /></IconButton>}
                title={username_display}
                subheader={created} />
              <ActionMenu
                anchorEl={anchorEl}
                openActionMenu={openActionMenu}
                closeActionMenu={closeActionMenu}
                toggleThreadWindow={toggleThreadWindow}
                profileThreadCounter={profileThreadCounter}
                setProfileThreadCounter={setProfileThreadCounter}
                id={id}
                toggleEditMode={toggleEditMode}
                setDeleteAlert={setDeleteAlert} />
              <CardMedia component='img' image={image} height='auto' />
              {isEditMode ? (
                <>
                  <StyledCardContent>
                    <EditTextField name='Edit' label='Edit' variant='outlined' placeholder='Make your changes here......'
                      onChange={e => setEditField(e.target.value)} defaultValue={content} multiline rows={3}
                      sx={{ width: '100%' }} InputProps={{ style: { fontSize: 14 } }} />
                    <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                      <Button variant='contained' onClick={async () => { await handleThreadUpdate(); toggleEditMode(); setUpdateAlert(true); }}
                        startIcon={<SaveIcon />} sx={{ width: 116 }}>Save</Button>
                      <Button variant='contained' color='inherit' onClick={toggleEditMode}
                        startIcon={<CancelRoundedIcon />} sx={{ width: 116 }}>Cancel</Button>
                    </CardActions>
                  </StyledCardContent>
                </>
              ) : (
                <CardContent>
                  <Typography variant='body2'>
                    {content}
                  </Typography>
                </CardContent>
              )}
            </Card>
          </ThreadBox>
        </Fade>
      </Modal>
      <ImageListItem sx={{ padding: 0.5 }}>
        <img
          src={image}
          alt={alt}
          loading="lazy"
          onMouseOver={() => { setHover(true) }}
          onMouseOut={() => { setHover(false) }}
          onClick={toggleThreadWindow}
          style={
            hover ? {
              zIndex: 1,
              transform: 'scale(1.1, 1.1)',
              boxShadow: '20px 20px 15px -4px #000000',
              transition: '0.5s',
              opacity: 0.85,
              cursor: 'pointer'
            } : {
              transition: '0.5s',
            }
          }
        />
      </ImageListItem>
      <Snackbar open={updateAlert} autoHideDuration={2000} onClose={closeupdateAlert}>
        <Alert onClose={closeupdateAlert} severity='success' 
          sx={{ bgcolor: '#1b5e20', color: 'white', width: '100%' }}>
          You've Successfully Updated this Thread
        </Alert>
      </Snackbar>
    </>
  );
};

function ActionMenu({ id, toggleThreadWindow, anchorEl, openActionMenu, closeActionMenu, profileThreadCounter, setProfileThreadCounter, toggleEditMode, setDeleteAlert }) {

  const deleteThread = async () => {
    await axiosInstance.delete(`api/public/thread/${id}`);
    updateProfileThreadCounter(profileThreadCounter);
    setDeleteAlert(true);
  };

  const updateProfileThreadCounter = (e) => {
    setProfileThreadCounter(e - 1);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id='action-menu'
        open={openActionMenu}
        onClose={closeActionMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32, height: 32, ml: -0.5, mr: 2,
            },
            '&:before': {
              content: '""', display: 'block', position: 'absolute',
              top: 0, right: 14, width: 10, height: 10,
              bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}>
        <MenuItem onClick={() => { toggleEditMode(); closeActionMenu(); }}
          sx={{ width: 130 }}>
          <ListItemIcon >
            <CreateRoundedIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={async () => { await deleteThread(); toggleThreadWindow(); }}>
          <ListItemIcon>
            <DeleteRoundedIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

