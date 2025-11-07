// react global
import React from 'react';

// components
import { Stack, Typography } from '@mui/material';

import nodataImage from '../../assets/noData.svg';

function NoDataComponent({ text }) {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img
        src={nodataImage}
        style={{
          maxWidth: '233px',
          maxHeight: '240px'
        }}
      />
      <Typography
        sx={(theme) => ({
          fontSize: '1.5rem',
          fontWeight: '600',
          color: theme.palette.secondary.main
        })}
      >
        {text ? text : 'No Data'}
      </Typography>
    </Stack>
  );
}

export default NoDataComponent;
