// react global
import React, { useState } from 'react';

// components
import SignIn from '../components/Login/SignIn';

import { Grid, Stack } from '@mui/material';
import SigninPresentation from 'components/Login/SignInPresentation';
import Loading from 'components/Shared/Loading';
import Footer from 'components/Footer/Footer'

function LoginPage({ isLoggedIn, setIsLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Stack sx={{ minHeight: '100vh' }} direction="column">
      <Grid
        container
        spacing={0}
        sx={{
          flex: 1,
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
      <Footer/>
    </Stack>
  );
}

export default LoginPage;
