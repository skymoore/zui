import React from 'react';

import { Stack, Typography, Box } from '@mui/material';

import logoWhite from '../../assets/zotLogoWhiteHorizontal.svg';

export default function SigninPresentation() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.secondary.main,
        minHeight: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })}
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
            src={logoWhite}
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
            fontWeight: '700',
            width: '100%',
            fontSize: '2.5rem',
            lineHeight: '3rem'
          }}
        >
          OCI-native container image registry, simplified
        </Typography>
      </Stack>
    </Box>
  );
}
