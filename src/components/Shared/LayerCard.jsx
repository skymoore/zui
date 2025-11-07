import React, { useState } from 'react';

import transform from 'utilities/transform';

import { Card, CardContent, Typography, Grid, Divider, Stack, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';

const StyledCard = styled(Card)({
  marginBottom: 2,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E0E5EB',
  borderRadius: '0.75rem',
  alignSelf: 'stretch',
  flexGrow: 0,
  order: 0,
  width: '100%'
});

const StyledCardContent = styled(CardContent)({
  textAlign: 'left',
  color: '#52637A',
  width: '100%',
  boxSizing: 'border-box',
  padding: '1rem',
  backgroundColor: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#FFFFFF'
  },
  '&:last-child': {
    paddingBottom: '1rem'
  }
});

const DropdownIcon = styled('div')({
  color: '#1479FF',
  paddingTop: '1rem',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  textAlign: 'center'
});

const DropdownButton = styled(Typography)({
  color: '#1479FF',
  paddingTop: '1rem',
  fontSize: '0.8125rem',
  fontWeight: '600',
  cursor: 'pointer'
});

const DropdownContentBox = styled(Typography)({
  boxSizing: 'border-box',
  color: '#52637A',
  fontSize: '1rem',
  fontWeight: '400',
  padding: '0.75rem',
  backgroundColor: '#F7F7F7',
  borderRadius: '0.9rem',
  overflowWrap: 'break-word'
});

function LayerCard(props) {
  const { layer, historyDescription } = props;
  const [open, setOpen] = useState(false);

  const getLayerSize = () => {
    if (historyDescription.EmptyLayer) return 0;
    else return layer.Size;
  };

  return (
    <StyledCard variant="outlined">
      <StyledCardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={10}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1rem',
                fontWeight: '400',
                paddingRight: '0.5rem',
                paddingBottom: '0.5rem',
                paddingTop: '0.5rem',
                textAlign: 'left',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer'
              }}
            >
              {historyDescription.CreatedBy}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1rem',
                fontWeight: '400',
                paddingBottom: '0.5rem',
                paddingTop: '0.5rem',
                textAlign: 'right'
              }}
            >
              {transform.formatBytes(getLayerSize())}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ margin: '1rem 0' }} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" onClick={() => setOpen((prevOpenState) => !prevOpenState)}>
              {!open ? <DropdownIcon as={KeyboardArrowRight} /> : <DropdownIcon as={KeyboardArrowDown} />}
              <DropdownButton>DETAILS</DropdownButton>
            </Stack>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ marginTop: '1rem' }}>
              <Stack direction="column" spacing="1.2rem">
                <Typography variant="body1">Command</Typography>
                <DropdownContentBox variant="body1" align="left">
                  {historyDescription.CreatedBy}
                </DropdownContentBox>
                {!historyDescription.EmptyLayer && (
                  <>
                    <Typography variant="body1">DIGEST</Typography>
                    <DropdownContentBox variant="body1" align="left">
                      {layer.Digest}
                    </DropdownContentBox>
                  </>
                )}
              </Stack>
            </Collapse>
          </Grid>
        </Grid>
      </StyledCardContent>
    </StyledCard>
  );
}

export default LayerCard;
