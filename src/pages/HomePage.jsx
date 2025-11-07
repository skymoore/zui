// components
import React from 'react';
import Header from '../components/Header/Header.jsx';

import { Container, Grid, Stack } from '@mui/material';
import Home from 'components/Home/Home.jsx';

function HomePage() {
  return (
    <Stack sx={{ height: '100%' }} direction="column" data-testid="homepage-container">
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: 30,
          paddingBottom: 5,
          height: '100%'
        }}
      >
        <Grid container sx={{ border: '0.0625em #f2f2f2 dashed' }}>
          <Grid item sx={{ width: '100%' }}>
            <Home />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

export default HomePage;
