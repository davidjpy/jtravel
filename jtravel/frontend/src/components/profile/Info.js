import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Card,
  CardContent,
  Button,
  CardActions
} from '@mui/material';
import { styled } from '@mui/material/styles'
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PersonIcon from '@mui/icons-material/Person';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 40
});

function Info({ auth }) {

  const { email, username, name, profile_image, about, start_date, last_login } = auth;
  var joinOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  var loginOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }

  return (
    <StyledBox paddingTop={16} paddingBottom={2}>
      <Box sx={{ display: 'flex', justifyContent: 'start', width: 920 }}>
        <Avatar src={profile_image}
          sx={{ height: 180, width: 180, ml: 2, mr: 4 }}>Az</Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mr: 2 }}>
          <Typography variant='h6' sx={{ fontSize: 40, width: 250, mb: 1 }}>{username}<IconButton>
            <ManageAccountsRoundedIcon fontSize='large' /></IconButton></Typography>
          <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon fontSize='small' sx={{ mr: 1 }} />@{name}</Typography>
          <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailRoundedIcon fontSize='small' sx={{ mr: 1 }} />Email: {email}</Typography>
          <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center' }}>
            <EventNoteRoundedIcon fontSize='small' sx={{ mr: 1 }} />Since @{new Date(start_date).toLocaleString('en-US', joinOptions)}</Typography>
          <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', color: '#0091ea' }}>
            <VpnKeyRoundedIcon fontSize='small' sx={{ mr: 1 }} />Last Login @{new Date(last_login).toLocaleString('en-US',loginOptions)}</Typography>
        </Box>
        <Divider orientation='vertical' sx={{ height: 'auto' }} />
        <Box sx={{ display: 'flex' }}>
          <Card sx={{ ml: 4, width: 360, display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>About Me:</Typography>
              <Typography variant='caption'>
                {about}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexGrow: 1, }}>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default Info;