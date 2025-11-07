import React, { useState } from 'react';

import { DateTime } from 'luxon';
import { isNil } from 'lodash';

import { Card, CardContent, Typography, Grid, Divider, Stack, Collapse, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import ApiKeyRevokeDialog from './ApiKeyRevokeDialog';

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
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  textAlign: 'center'
});

const DropdownButton = styled(Typography)({
  color: '#1479FF',
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

function ApiKeyCard(props) {
  const { apiKey, onRevoke } = props;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [apiKeyRevokeOpen, setApiKeyRevokeOpen] = useState(false);

  const getExpirationDisplay = () => {
    const expDateTime = DateTime.fromISO(apiKey.expirationDate);
    return `Expires on ${expDateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}`;
  };

  const handleApiKeyRevokeDialogOpen = () => {
    setApiKeyRevokeOpen(true);
  };

  return (
    <StyledCard variant="outlined">
      <StyledCardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={6}>
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
              {apiKey.label}
            </Typography>
          </Grid>
          <Grid item xs={4}>
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
              {getExpirationDisplay()}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'right'
            }}
          >
            <Button color="error" variant="contained" onClick={handleApiKeyRevokeDialogOpen}>
              Revoke
            </Button>
          </Grid>
          {!isNil(apiKey.apiKey) && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ margin: '1rem 0' }} />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" onClick={() => setOpenDropdown((prevOpenState) => !prevOpenState)}>
                  {!openDropdown ? <DropdownIcon as={KeyboardArrowRight} /> : <DropdownIcon as={KeyboardArrowDown} />}
                  <DropdownButton>KEY</DropdownButton>
                </Stack>
                <Collapse in={openDropdown} timeout="auto" unmountOnExit sx={{ marginTop: '1rem' }}>
                  <Stack direction="column" spacing="1.2rem">
                    <DropdownContentBox variant="body1" align="left">
                      {apiKey.apiKey}
                    </DropdownContentBox>
                  </Stack>
                </Collapse>
              </Grid>
            </>
          )}
        </Grid>
        <ApiKeyRevokeDialog
          open={apiKeyRevokeOpen}
          setOpen={setApiKeyRevokeOpen}
          apiKey={apiKey}
          onConfirm={onRevoke}
        />
      </StyledCardContent>
    </StyledCard>
  );
}

export default ApiKeyCard;
