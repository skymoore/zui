import React from 'react';
import { Box } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        top: '10%',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <img src="/logo.svg" className="App-logo Loading" alt="logo" />
    </Box>
  );
};

export default Loading;
