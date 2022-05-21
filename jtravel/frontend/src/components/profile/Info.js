import React from 'react';
import { Box, Avatar, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles'

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 30
});

function Info() {

  return (
    <StyledBox paddingTop={20}>
      <Avatar src='https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg'
        sx={{ height: 160, width: 160, ml: 3 }}>Az</Avatar>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h4'>davidho</Typography>
        <Typography variant='h7'>Ho Chi Hang</Typography>
        <Typography variant='h7'>david1999.hch@gmail.com</Typography>
        <Typography variant='h7'>16 May 2022</Typography>
      </Box>
    </StyledBox>
  );
};

export default Info;