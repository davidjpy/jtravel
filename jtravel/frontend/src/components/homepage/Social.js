import * as React from 'react';
import { Box, Typography, Avatar, AvatarGroup, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Avatars, Chats } from './SocialData'

const Container = styled(Box)({
  display: 'flex',
  position: 'sticky',
  alignSelf: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-start',
  top: 0
})

function Social() {
  return (
    <Container paddingTop={10} flex={2}>
      <Box sx={{ mt: 1, ml: 2 }}>
        {/* Active Users */}
        <Divider textAlign='left' sx={{ mb: 1, color: '#37474f' }}>
          <Typography variant='h6' sx={{ color: '#37474f' }}>
            Active User
          </Typography>
        </Divider>
        <AvatarGroup max={9} total={28}
          sx={{ mr: 2 }}>
          {Avatars.map((item, index) => {
            return (
              <Avatar key={index}>{item.avatar}</Avatar>
            )
          })}
        </AvatarGroup>
        {/* Chat */}
        <Divider textAlign='left' sx={{ mt: 3, color: '#37474f' }}>
          <Typography variant='h6' sx={{ color: '#37474f' }}>
            Public Chatroom
          </Typography>
        </Divider>
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
    </Container>
  )
}

export default Social;