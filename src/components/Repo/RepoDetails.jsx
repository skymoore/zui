// react global
import React, { useEffect, useMemo, useRef, useState } from 'react';

// external
import { DateTime } from 'luxon';
import { isEmpty, uniq } from 'lodash';

// utility
import { api, endpoints } from '../../api';
import { host } from '../../host';
import { useParams, useNavigate, createSearchParams } from 'react-router';
import { mapToRepoFromRepoInfo } from 'utilities/objectModels';
import { isAuthenticated } from 'utilities/authUtilities';
import filterConstants from 'utilities/filterConstants';

// components
import { Card, CardContent, CardMedia, Chip, Grid, Stack, Tooltip, Typography, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Tags from './Tabs/Tags.jsx';
import RepoDetailsMetadata from './RepoDetailsMetadata';
import Loading from '../Shared/Loading';
import { Markdown } from 'utilities/MarkdowntojsxWrapper';
import { VulnerabilityIconCheck, SignatureIconCheck } from 'utilities/vulnerabilityAndSignatureCheck';

// placeholder images
import repocube1 from '../../assets/repocube-1.png';
import repocube2 from '../../assets/repocube-2.png';
import repocube3 from '../../assets/repocube-3.png';
import repocube4 from '../../assets/repocube-4.png';

// temporary utility to get image
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomImage = () => {
  const imageArray = [repocube1, repocube2, repocube3, repocube4];
  return imageArray[randomIntFromInterval(0, 3)];
};

function RepoDetails() {
  const [repoDetailData, setRepoDetailData] = useState({});
  const [tags, setTags] = useState([]);
  const placeholderImage = useRef(randomImage());
  const [isLoading, setIsLoading] = useState(true);
  // get url param from <Route here (i.e. image name)
  const { name } = useParams();
  const navigate = useNavigate();
  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`${host()}${endpoints.detailedRepoInfo(name)}`, abortController.signal)
      .then((response) => {
        if (response.data && response.data.data) {
          let repoInfo = response.data.data.ExpandedRepoInfo;
          let imageData = mapToRepoFromRepoInfo(repoInfo);
          setRepoDetailData(imageData);
          setTags(imageData.images);
        } else if (!isEmpty(response.data.errors)) {
          navigate('/home');
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setRepoDetailData({});
        setIsLoading(false);
        setTags([]);
      });
    return () => {
      abortController.abort();
    };
  }, [name]);

  const handleDeleteTag = (removed) => {
    setTags((prevState) => prevState.filter((tag) => tag.tag !== removed));
  };

  const handlePlatformChipClick = (event) => {
    const { textContent } = event.target;
    event.stopPropagation();
    event.preventDefault();
    navigate({ pathname: `/explore`, search: createSearchParams({ filter: textContent }).toString() });
  };

  const platformChips = () => {
    const platforms = repoDetailData?.platforms || [];
    const filteredPlatforms = platforms?.flatMap((platform) => [platform.Os, platform.Arch]);

    return uniq(filteredPlatforms).map((platform, index) => (
      <Chip
        key={`${name}${platform}${index}`}
        label={platform}
        onClick={handlePlatformChipClick}
        sx={{
          backgroundColor: '#E0E5EB',
          color: '#52637A',
          fontSize: '0.813rem',
          lineHeight: '0.813rem',
          borderRadius: '0.375rem',
          padding: '0.313rem 0.625rem',
          '& .MuiChip-label': {
            padding: '0'
          }
        }}
      />
    ));
  };

  const handleBookmarkClick = () => {
    api.put(`${host()}${endpoints.bookmarkToggle(name)}`, abortController.signal).then((response) => {
      if (response && response.status === 200) {
        setRepoDetailData((prevState) => ({
          ...prevState,
          isBookmarked: !prevState.isBookmarked
        }));
      }
    });
  };

  const handleStarClick = () => {
    api.put(`${host()}${endpoints.starToggle(name)}`, abortController.signal).then((response) => {
      if (response.status === 200) {
        setRepoDetailData((prevState) => ({
          ...prevState,
          isStarred: !prevState.isStarred
        }));
      }
    });
  };

  const getVendor = () => {
    return `${repoDetailData.newestTag?.Vendor || 'Vendor not available'} •`;
  };
  const getVersion = () => {
    return `published ${repoDetailData.newestTag?.Tag} •`;
  };
  const getLast = () => {
    const lastDate = repoDetailData.lastUpdated
      ? DateTime.fromISO(repoDetailData.lastUpdated).toRelative({ unit: ['weeks', 'days', 'hours', 'minutes'] })
      : `Timestamp N/A`;
    return lastDate;
  };

  const getSignatureChips = () => {
    const cosign = repoDetailData.signatureInfo
      ?.map((s) => s.tool)
      .includes(filterConstants.signatureToolConstants.COSIGN)
      ? repoDetailData.signatureInfo.filter((si) => si.tool == filterConstants.signatureToolConstants.COSIGN)
      : null;
    const notation = repoDetailData.signatureInfo
      ?.map((s) => s.tool)
      .includes(filterConstants.signatureToolConstants.NOTATION)
      ? repoDetailData.signatureInfo.filter((si) => si.tool == filterConstants.signatureToolConstants.NOTATION)
      : null;
    const sigArray = [];
    if (cosign) sigArray.push(cosign);
    if (notation) sigArray.push(notation);
    if (sigArray.length === 0) return <SignatureIconCheck />;
    return sigArray.map((sig, index) => (
      <div className="hide-on-mobile" key={`${name}sig${index}`}>
        <SignatureIconCheck signatureInfo={sig} />
      </div>
    ));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid
          container
          sx={{
            backgroundColor: 'transparent',
            height: '100%'
          }}
        >
          <Grid item xs={12} md={12}>
            <Card sx={{ boxShadow: 'none!important' }}>
              <CardContent>
                <Grid
                  container
                  sx={(theme) => ({
                    [theme.breakpoints.down('md')]: {
                      padding: '0'
                    }
                  })}
                >
                  <Grid item xs={12} md={8}>
                    <Stack alignItems="center" direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <Stack alignItems="center" sx={{ width: { xs: '100%', md: 'auto' } }} direction="row" spacing={2}>
                        <CardMedia
                          component="img"
                          image={placeholderImage.current}
                          alt="icon"
                          sx={{
                            borderRadius: '3.125em',
                            height: '1.438rem',
                            width: '1.438rem',
                            objectFit: 'fill'
                          }}
                        />
                        <Typography
                          variant="h4"
                          sx={(theme) => ({
                            fontWeight: '600',
                            fontSize: '1.5rem',
                            color: theme.palette.secondary.main,
                            textAlign: 'left'
                          })}
                        >
                          {name}
                        </Typography>
                      </Stack>
                      <Stack alignItems="center" sx={{ width: { xs: '100%', md: 'auto' } }} direction="row" spacing={2}>
                        <VulnerabilityIconCheck vulnerabilitySeverity={repoDetailData?.vulnerabilitySeverity} />
                        {getSignatureChips()}
                      </Stack>
                      <Stack alignItems="center" sx={{ width: { xs: '100%', md: 'auto' } }} direction="row" spacing={1}>
                        {isAuthenticated() && (
                          <IconButton component="span" onClick={handleStarClick} data-testid="star-button">
                            {repoDetailData?.isStarred ? (
                              <StarIcon data-testid="starred" />
                            ) : (
                              <StarBorderIcon data-testid="not-starred" />
                            )}
                          </IconButton>
                        )}
                        {isAuthenticated() && (
                          <Stack
                            alignItems="center"
                            sx={{ width: { xs: '100%', md: 'auto' } }}
                            direction="row"
                            spacing={2}
                          >
                            <IconButton component="span" onClick={handleBookmarkClick} data-testid="bookmark-button">
                              {repoDetailData?.isBookmarked ? (
                                <BookmarkIcon data-testid="bookmarked" />
                              ) : (
                                <BookmarkBorderIcon data-testid="not-bookmarked" />
                              )}
                            </IconButton>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                    <Typography
                      gutterBottom
                      sx={(theme) => ({
                        textAlign: 'left',
                        fontSize: '1rem',
                        lineHeight: '1.5rem',
                        color: 'rgba(0, 0, 0, 0.6)',
                        padding: '1rem 0 0 0',
                        [theme.breakpoints.down('md')]: {
                          padding: '0.5rem 0 0 0'
                        }
                      })}
                    >
                      {repoDetailData?.title || 'Title not available'}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={(theme) => ({
                        alignItems: 'center',
                        padding: '0.15rem 0 0 0',
                        [theme.breakpoints.down('md')]: {
                          padding: '0.5rem 0 0 0'
                        }
                      })}
                    >
                      {platformChips()}
                    </Stack>
                    <Stack alignItems="center" direction="row" spacing={1} pt={'0.5rem'}>
                      <Tooltip title={getVendor()} placement="top" className="hide-on-mobile">
                        <Typography
                          variant="body2"
                          noWrap
                          sx={(theme) => ({
                            color: theme.palette.primary.main,
                            fontSize: '0.75rem',
                            maxWidth: '50%',
                            textOverflow: 'ellipsis',
                            lineHeight: '1.125rem'
                          })}
                        >
                          {<Markdown options={{ forceInline: true }}>{getVendor()}</Markdown>}
                        </Typography>
                      </Tooltip>
                      <Tooltip title={getVersion()} placement="top" className="hide-on-mobile">
                        <Typography
                          variant="body2"
                          noWrap
                          sx={(theme) => ({
                            color: theme.palette.secondary.dark,
                            fontSize: '0.75rem',
                            lineHeight: '1.125rem',
                            textOverflow: 'ellipsis'
                          })}
                        >
                          {getVersion()}
                        </Typography>
                      </Tooltip>
                      <Tooltip title={repoDetailData.lastUpdated?.slice(0, 16) || ' '} placement="top">
                        <Typography
                          variant="body2"
                          noWrap
                          sx={(theme) => ({
                            color: theme.palette.secondary.dark,
                            fontSize: '0.75rem',
                            lineHeight: '1.125rem',
                            textOverflow: 'ellipsis'
                          })}
                        >
                          {getLast()}
                        </Typography>
                      </Tooltip>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={(theme) => ({
              marginTop: '1.5rem',
              height: '100%',
              [theme.breakpoints.down('md')]: {
                padding: '0'
              }
            })}
          >
            <Card sx={{ boxShadow: 'none!important' }}>
              <CardContent sx={{ padding: '1.5rem' }}>
                <Tags tags={tags} repoName={name} onTagDelete={handleDeleteTag} />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={(theme) => ({
              marginTop: '1.5rem',
              paddingLeft: '1.25rem',
              [theme.breakpoints.down('md')]: {
                marginTop: '1rem',
                paddingLeft: '0'
              }
            })}
          >
            <RepoDetailsMetadata
              totalDownloads={repoDetailData?.downloads}
              repoURL={repoDetailData?.source}
              lastUpdated={repoDetailData?.lastUpdated}
              size={repoDetailData?.size}
              latestTag={repoDetailData?.newestTag}
              license={repoDetailData?.license}
              description={repoDetailData?.description}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
export default RepoDetails;
