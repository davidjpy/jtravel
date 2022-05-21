import React from 'react';
import { Tooltip, Fab } from '@mui/material'
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

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

function Create () {

  return (
    <>
      <StyledTooltip title='Create'>
        <Fab aria-label='create'>
          <EditIcon />
        </Fab>
      </StyledTooltip>
    </>
  );
};

export default Create;