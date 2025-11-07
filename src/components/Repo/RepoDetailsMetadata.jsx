import { Card, CardContent, Grid, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { Markdown } from 'utilities/MarkdowntojsxWrapper';
import React from 'react';
import transform from '../../utilities/transform';

const StyledCard = styled(Card)({
  marginBottom: 2,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  background: '#FFFFFF',
  border: '0',
  borderRadius: '0.5rem',
  flex: 'none',
  alignSelf: 'stretch',
  flexGrow: 0,
  order: 0,
  width: '100%'
});

const StyledCardContent = styled(CardContent)({
  '&:last-child': {
    padding: '0.5rem 1rem'
  }
});

function RepoDetailsMetadata(props) {
  const { repoURL, totalDownloads, lastUpdated, size, license, description } = props;

  const lastDate = lastUpdated
    ? DateTime.fromISO(lastUpdated).toRelative({ unit: ['weeks', 'days', 'hours', 'minutes'] })
    : `Timestamp N/A`;
  const metadataHeaderSx = (theme) => ({
    color: theme.palette.secondary.dark,
    fontSize: '0.75rem',
    lineHeight: '1.125rem'
  });

  const metadataBodySx = (theme) => ({
    color: theme.palette.primary.main,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '150%',
    align: 'left'
  });

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12}>
        <StyledCard variant="outlined">
          <StyledCardContent>
            <Typography variant="body2" align="left" sx={metadataHeaderSx}>
              Repository
            </Typography>
            <Typography variant="body1" align="left" sx={metadataBodySx}>
              {repoURL || `not available`}
            </Typography>
          </StyledCardContent>
        </StyledCard>
      </Grid>
      <Grid container item xs={12}>
        <StyledCard variant="outlined">
          <StyledCardContent>
            <Typography variant="body2" align="left" sx={metadataHeaderSx}>
              Total downloads
            </Typography>
            <Typography variant="body1" align="left" sx={metadataBodySx}>
              {!isNaN(totalDownloads) ? totalDownloads : `not available`}
            </Typography>
          </StyledCardContent>
        </StyledCard>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={6}>
          <StyledCard variant="outlined">
            <StyledCardContent>
              <Typography variant="body2" align="left" sx={metadataHeaderSx}>
                Last publish
              </Typography>
              <Tooltip title={lastUpdated?.slice(0, 16) || ' '} placement="top">
                <Typography variant="body1" align="left" sx={metadataBodySx}>
                  {lastDate}
                </Typography>
              </Tooltip>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={6}>
          <StyledCard variant="outlined">
            <StyledCardContent>
              <Typography variant="body2" align="left" sx={metadataHeaderSx}>
                Total size
              </Typography>
              <Typography variant="body1" align="left" sx={metadataBodySx}>
                {transform.formatBytes(size) || `----`}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <StyledCard variant="outlined">
            <StyledCardContent>
              <Typography variant="body2" align="left" sx={metadataHeaderSx}>
                License
              </Typography>
              <Tooltip title={license || ' '} placement="top">
                <Typography variant="body1" align="left" sx={metadataBodySx}>
                  {license ? <Markdown>{license}</Markdown> : `License info not available`}
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
              <Typography variant="body2" align="left" sx={metadataHeaderSx}>
                Description
              </Typography>
              <Typography variant="body1" align="left" sx={metadataBodySx}>
                {description ? <Markdown>{description}</Markdown> : `Description not available`}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RepoDetailsMetadata;
