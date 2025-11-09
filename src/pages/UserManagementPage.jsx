import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isEmpty } from 'lodash';

import { getLoggedInUser } from 'utilities/authUtilities.js';

import { Container, Grid, Stack } from '@mui/material';

import Header from '../components/Header/Header.jsx';
import ApiKeys from '../components/User/ApiKeys/ApiKeys.jsx';

function UserManagementPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(getLoggedInUser())) {
      navigate('/home');
    }
  }, []);

  return (
    <Stack sx={{ height: '100%', minHeight: '100vh' }} direction="column" data-testid="explore-container">
      <Header />
      <Container
        sx={{
          paddingTop: 30,
          paddingBottom: 5,
          flex: 1,
          minWidth: '60%'
        }}
      >
        <Grid container sx={{ border: '0.0625rem #f2f2f2 dashed' }}>
          <Grid item sx={{ width: '100%', padding: 5 }}>
            <ApiKeys />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

export default UserManagementPage;
