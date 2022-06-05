import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Card,
  CardContent,
  Button,
  CardActions,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles'
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PersonIcon from '@mui/icons-material/Person';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import SaveIcon from '@mui/icons-material/Save';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import axiosInstance from '../../utils/Axios';

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 40
});

const EditTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#263238',
    },
  },
  width: '100%'
});

function Info({ auth, updateTiggerer, setUpdateTiggerer }) {

  const { id, email, username, name, profile_image, about, start_date, last_login } = auth;
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditAbout, setIsEditAbout] = useState(false);
  const [editEmail, setEditEmail] = useState(email);
  const [editUsername, setEditUsername] = useState(username);
  const [editName, setEditName] = useState(name);
  const [editProfileImage, setEditProfileImage] = useState(profile_image);
  const [editAbout, setEditAbout] = useState(about);
  const joinOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const loginOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  const toggleEditProfileMode = () => {
    setIsEditProfile(!isEditProfile);
  };

  const toggleEditAboutMode = () => {
    setIsEditAbout(!isEditAbout);
  }

  const handleUpdateProfile = (e) => {
    setUpdateTiggerer(e + 1);
  };

  const handleProfileUpdate = async () => {
    try {
      await axiosInstance.put(`account/auth/user/${id}/`,
        {
          "email": editEmail,
          "username": editUsername,
          "name": editName,
          "about": editAbout,
        },
        {
          headers:
          {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        });
      handleUpdateProfile(updateTiggerer);
    }
    catch (err) {
      console.error(err);
    };
  };

  return (
    <StyledBox paddingTop={16} paddingBottom={2}>
      <Box sx={{ display: 'flex', justifyContent: 'start', width: 920 }}>
        <Avatar src={profile_image} sx={{ height: 180, width: 180, ml: 2, mr: 4 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mr: 2 }}>
          {isEditProfile ? (
            <>
              <EditTextField name='User ID' label='User ID' variant='outlined' placeholder='Make your changes here......'
                defaultValue={username} onChange={e => setEditUsername(e.target.value)} InputProps={{ style: { fontSize: 7 } }} />
              <EditTextField name='Name' label='Name' variant='outlined' placeholder='Make your changes here......'
                defaultValue={name} onChange={e => setEditName(e.target.value)} InputProps={{ style: { fontSize: 7 } }} />
              <EditTextField name='Email' label='Email' variant='outlined' placeholder='Make your changes here......'
                defaultValue={email} onChange={e => setEditEmail(e.target.value)} InputProps={{ style: { fontSize: 7 } }} />
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Button variant='contained' onClick={async () => { await handleProfileUpdate(); toggleEditProfileMode(); }} startIcon={<SaveIcon />}
                  sx={{ width: 116 }}>Save</Button>
                <Button variant='contained' color='inherit' onClick={toggleEditProfileMode} startIcon={<CancelRoundedIcon />}
                  sx={{ width: 116 }}>Cancel</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant='h6' sx={{ fontSize: 40, width: 250, mb: 1 }}>{username}<IconButton onClick={toggleEditProfileMode}>
                <ManageAccountsRoundedIcon fontSize='large' /></IconButton></Typography>
              <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon fontSize='small' sx={{ mr: 1 }} />@{name}</Typography>
              <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailRoundedIcon fontSize='small' sx={{ mr: 1 }} />Email: {email}</Typography>
              <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center' }}>
                <EventNoteRoundedIcon fontSize='small' sx={{ mr: 1 }} />Since @{new Date(start_date).toLocaleString('en-US', joinOptions)}</Typography>
              <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', color: '#0091ea' }}>
                <VpnKeyRoundedIcon fontSize='small' sx={{ mr: 1 }} />Last Login @{new Date(last_login).toLocaleString('en-US', loginOptions)}</Typography>
            </>
          )}
        </Box>
        <Divider orientation='vertical' sx={{ height: 'auto' }} />
        <Box sx={{ display: 'flex' }}>
          <Card sx={{ ml: 4, width: 360, display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>About Me:</Typography>
              {isEditAbout ? (
                <EditTextField name='About Me' label='About Me' variant='outlined' placeholder='Make your changes here......'
                  autoFocus defaultValue={about} multiline rows={4} onChange={e => setEditAbout(e.target.value)}
                  InputProps={{ style: { fontSize: 10 } }} />
              ) : (
                <Typography variant='caption'>
                  {about}
                </Typography>
              )}
            </CardContent>
            {isEditAbout ? (
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexGrow: 1, paddingTop: 0 }}>
                <Button variant='contained' onClick={() => { handleProfileUpdate(); toggleEditAboutMode(); }} startIcon={<SaveIcon />}
                  sx={{ width: 116 }}>Save</Button>
                <Button variant='contained' color='inherit' onClick={toggleEditAboutMode} startIcon={<CancelRoundedIcon />}
                  sx={{ width: 116 }}>Cancel</Button>
              </CardActions>
            ) : (
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexGrow: 1, }}>
                <Button size="small" startIcon={<EditRoundedIcon />} variant='contained' onClick={toggleEditAboutMode}
                  sx={{ width: 85 }}>Edit</Button>
              </CardActions>
            )}
          </Card>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default Info;