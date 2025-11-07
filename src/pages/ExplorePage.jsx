// components
import React, { useState } from 'react';
import Header from '../components/Header/Header.jsx';

import { Container, Grid, Stack } from '@mui/material';
import Explore from 'components/Explore/Explore.jsx';

function ExplorePage() {
  const [searchCurrentValue, setSearchCurrentValue] = useState();

  return (
    <Stack sx={{ height: '100%' }} direction="column" data-testid="explore-container">
      <Header setSearchCurrentValue={setSearchCurrentValue} />
      <Container
        sx={{
          paddingTop: 30,
          paddingBottom: 5,
          height: '100%',
          minWidth: '60%'
        }}
      >
        <Grid container sx={{ border: '0.0625rem #f2f2f2 dashed' }}>
          <Grid item sx={{ width: '100%', padding: 5 }}>
            <Explore searchInputValue={searchCurrentValue} />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

export default ExplorePage;
