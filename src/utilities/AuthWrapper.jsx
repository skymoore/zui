import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { Box } from '@mui/material';

const AuthWrapper = ({ isLoggedIn, redirect, hasHeader = false }) => {
  return isLoggedIn ? (
    <Box
      sx={
        hasHeader
          ? {
              marginTop: '10vh',
              minHeight: '90vh',
              height: '100%'
            }
          : undefined
      }
    >
      <Outlet />
    </Box>
  ) : (
    <Navigate to={redirect} replace={true} />
  );
};

export { AuthWrapper };
