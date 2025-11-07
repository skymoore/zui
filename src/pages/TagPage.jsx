// react global
import React from 'react';

// components

import { Container, Grid, Stack } from '@mui/material';
import Header from 'components/Header/Header';
import TagDetails from 'components/Tag/TagDetails';
import ExploreHeader from 'components/Header/ExploreHeader';

function TagPage() {
  return (
    <Stack
      direction="column"
      sx={{
        height: '100%',
        display: 'flex',
        flexFlow: 'column'
      }}
      data-testid="tag-container"
    >
      <Header />
      <Container
        sx={{
          paddingTop: 5,
          paddingBottom: 5,
          display: 'flex',
          flexFlow: 'column',
          height: '100%'
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
            <TagDetails />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

export default TagPage;
