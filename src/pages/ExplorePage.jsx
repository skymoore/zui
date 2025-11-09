// components
import React, { useState } from 'react';
import Header from '../components/Header/Header.jsx';

import { Container, Grid, Stack } from '@mui/material';
import Explore from 'components/Explore/Explore.jsx';

function ExplorePage() {
  const [searchCurrentValue, setSearchCurrentValue] = useState();

  return (
    <Stack sx={{ height: '100%', minHeight: '100vh' }} direction="column" data-testid="explore-container">
      <Header setSearchCurrentValue={setSearchCurrentValue} />
      <Container
        sx={(theme) => ({
          paddingTop: 10,
          paddingBottom: 5,
          flex: 1,
          minWidth: '60%',
          [theme.breakpoints.down('sm')]: {
            paddingLeft: 2,
            paddingRight: 2
          }
        })}
      >
        <Grid container sx={{ border: '0.0625rem #f2f2f2 dashed' }}>
          <Grid
            item
            sx={(theme) => ({
              width: '100%',
              padding: 5,
              [theme.breakpoints.down('sm')]: {
                padding: 2
              }
            })}
          >
            <Explore searchInputValue={searchCurrentValue} />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

export default ExplorePage;
