// components
import React from 'react';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';

import { Container, Grid, Stack } from '@mui/material';
import Home from 'components/Home/Home.jsx';

function HomePage() {
  return (
    <Stack sx={{ minHeight: '100vh', display: 'flex', flexFlow: 'column' }} direction="column" data-testid="homepage-container">
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: 10,
          paddingBottom: 5,
          flex: 1
        }}
      >
        <Grid container sx={{ border: '0.0625em #f2f2f2 dashed' }}>
          <Grid item sx={{ width: '100%' }}>
            <Home />
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </Stack>
  );
}

export default HomePage;
