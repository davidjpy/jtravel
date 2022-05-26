import * as React from 'react';
import { Box, Typography, Avatar, AvatarGroup, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Avatars, Chats } from './SocialData'

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'sticky',
  alignSelf: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-start',
  top: 0,
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

function Social() {

  return (
    <StyledBox paddingTop={10} flex={2}>
      <Box sx={{ mt: 1 }}>
        {/* Active Users */}
        <Typography variant='h6' sx={{ mb: 1 }}>
          Active User
        </Typography>
        <AvatarGroup max={9} total={28}
          sx={{ mr: 2.5 }}>
          {Avatars.map((item, index) => {
            return (
              <Avatar key={index}>{item.avatar}</Avatar>
            )
          })}
        </AvatarGroup>
        {/* Chat */}
        <Typography variant='h6' sx={{ mt: 4 }}>
          Public Chatroom
        </Typography>
        {Chats.map((item, index) => {
          return (
            <List key={index} sx={{ height: 50, width: '100%', maxWidth: 450 }}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt={item.alt} src={item.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.user} secondary={item.text} />
              </ListItem>
              <Divider variant='middle' sx={{ width: 320 }} />
            </List>
          )
        })}
      </Box>
    </StyledBox>
  )
}

export default Social;