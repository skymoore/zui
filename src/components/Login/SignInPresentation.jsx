import React from 'react';

import { Stack, Typography, Box } from '@mui/material';

export default function SigninPresentation() {
  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        minHeight: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Stack
        spacing={'3rem'}
        sx={{
          width: '51%',
          height: '22%'
        }}
        data-testid="presentation-container"
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <img
            src="/logo.svg"
            alt="zot logo"
            style={{
              width: '64%'
            }}
          ></img>
        </Box>
        <Typography
          variant="h2"
          sx={{
            color: '#F6F7F9',
            fontWeight: '400',
            fontSize: '1.5rem',
            lineHeight: '2rem'
          }}
        >
          container image registry
        </Typography>
      </Stack>
    </Box>
  );
}
