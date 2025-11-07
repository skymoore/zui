// react global
import React, { useState } from 'react';

// components
import SignIn from '../components/Login/SignIn';

import { Grid } from '@mui/material';
import SigninPresentation from 'components/Login/SignInPresentation';
import Loading from 'components/Shared/Loading';

function LoginPage({ isLoggedIn, setIsLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Grid
      container
      spacing={0}
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F6F7F9'
      }}
      data-testid="login-container"
    >
      {isLoading && <Loading />}
      <Grid
        item
        xs={1}
        md={6}
        className="hide-on-small"
        sx={{
          display: isLoading ? 'none' : undefined
        }}
      >
        <SigninPresentation />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{
          display: isLoading ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} wrapperSetLoading={setIsLoading} />
      </Grid>
    </Grid>
  );
}

export default LoginPage;
