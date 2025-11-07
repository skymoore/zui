import React from 'react';

import transform from '../../utilities/transform';
import { DateTime } from 'luxon';
import { Markdown } from 'utilities/MarkdowntojsxWrapper';

import { Card, CardContent, Grid, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PullCommandButton from 'components/Shared/PullCommandButton';

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  background: '#FFFFFF',
  borderRadius: '0.5rem',
  borderColor: '#FFFFFF',
  flex: 'none',
  alignSelf: 'stretch',
  flexGrow: 0,
  order: 0,
  width: '100%'
});

const StyledCardContent = styled(CardContent)({
  padding: '0.5rem 1rem',
  '&:last-child': {
    paddingBottom: '0.5rem'
  }
});

const PullImageCardContent = styled(CardContent)({
  padding: '0',
  width: '100%',
  '&:last-child': {
    paddingBottom: '0'
  }
});

function TagDetailsMetadata(props) {
  const { platform, lastUpdated, size, license, imageName } = props;

  const lastDate = lastUpdated
    ? DateTime.fromISO(lastUpdated).toRelative({ unit: ['weeks', 'days', 'hours', 'minutes'] })
    : `Timestamp N/A`;

  return (
    <Grid container spacing={'1rem'} data-testid="tagDetailsMetadata-container">
      <Grid item xs={12} className={`hide-on-mobile`}>
        <StyledCard variant="outlined">
          <PullImageCardContent>
            <PullCommandButton imageName={imageName || ''} />
          </PullImageCardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12}>
        <StyledCard variant="outlined">
          <StyledCardContent>
            <Typography variant="body2" align="left" sx={(theme) => ({ color: theme.palette.secondary.dark })}>
              OS/Arch
            </Typography>
            <Typography
              variant="body1"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: '150%',
                align: 'left'
              })}
            >
              {platform?.Os || `----`} / {platform?.Arch || `----`}
            </Typography>
          </StyledCardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12}>
        <StyledCard variant="outlined">
          <StyledCardContent>
            <Typography variant="body2" align="left" sx={(theme) => ({ color: theme.palette.secondary.dark })}>
              Total Size
            </Typography>
            <Typography
              variant="body1"
              align="left"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: '150%',
                align: 'left'
              })}
            >
              {transform.formatBytes(size) || `----`}
            </Typography>
          </StyledCardContent>
        </StyledCard>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <StyledCard variant="outlined">
            <StyledCardContent>
              <Typography variant="body2" align="left" sx={(theme) => ({ color: theme.palette.secondary.dark })}>
                Last Published
              </Typography>
              <Tooltip title={lastUpdated?.slice(0, 16) || ' '} placement="top">
                <Typography
                  variant="body1"
                  align="left"
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: '150%',
                    align: 'left'
                  })}
                >
                  {lastDate}
                </Typography>
              </Tooltip>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <StyledCard variant="outlined">
            <StyledCardContent>
              <Typography variant="body2" align="left" sx={(theme) => ({ color: theme.palette.secondary.dark })}>
                License
              </Typography>
              <Tooltip title={license || ' '} placement="top">
                <Typography
                  variant="body1"
                  align="left"
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: '150%',
                    align: 'left'
                  })}
                >
                  {license ? <Markdown>{license}</Markdown> : `License info not available`}
                </Typography>
              </Tooltip>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TagDetailsMetadata;
