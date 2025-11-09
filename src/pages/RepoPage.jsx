// react global
import React from 'react';

// components

import { Container, Grid, Stack } from '@mui/material';
import Header from 'components/Header/Header';
import RepoDetails from 'components/Repo/RepoDetails';
import ExploreHeader from 'components/Header/ExploreHeader';

function RepoPage() {
  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexFlow: 'column'
      }}
      data-testid="repo-container"
    >
      <Header />
      <Container
        sx={{
          paddingTop: 5,
          paddingBottom: 5,
          display: 'flex',
          flexFlow: 'column',
          flex: 1
        }}
      >
        <ExploreHeader />
        <Grid
          container
          sx={{
            backgroundColor: 'transparent',
            width: '100%',
            display: 'flex',
            flexFlow: 'column',
            height: '100%'
          }}
        >
          <Grid item xs={12}>
            <RepoDetails />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

export default RepoPage;
