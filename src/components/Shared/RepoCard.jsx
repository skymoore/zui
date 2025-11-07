// react global
import React, { useRef, useMemo, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router';

// utility
import { DateTime } from 'luxon';
import { uniq } from 'lodash';

// api module
import { api, endpoints } from '../../api';
import { host } from '../../host';
import { isAuthenticated } from '../../utilities/authUtilities';

// components
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
  Grid,
  Tooltip,
  IconButton,
  useMediaQuery
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useTheme } from '@emotion/react';

import { VulnerabilityIconCheck, SignatureIconCheck } from 'utilities/vulnerabilityAndSignatureCheck';
import { Markdown } from 'utilities/MarkdowntojsxWrapper';
import filterConstants from 'utilities/filterConstants';

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

function RepoCard(props) {
  const navigate = useNavigate();
  const placeholderImage = useRef(randomImage());
  // dynamically check device size with mui media query hook
  const theme = useTheme();
  const isXsSize = useMediaQuery(theme.breakpoints.down('md'));
  const MAX_PLATFORM_CHIPS = isXsSize ? 3 : 6;

  const abortController = useMemo(() => new AbortController(), []);

  const {
    name,
    vendor,
    platforms,
    description,
    downloads,
    stars,
    signatureInfo,
    lastUpdated,
    version,
    vulnerabilityData,
    isBookmarked,
    isStarred
  } = props;

  // keep a local bookmark state to display in the ui dynamically on updates
  const [currentBookmarkValue, setCurrentBookmarkValue] = useState(isBookmarked);

  // keep a local star state to display in the ui dynamically on updates
  const [currentStarValue, setCurrentStarValue] = useState(isStarred);

  const [currentStarCount, setCurrentStarCount] = useState(stars);

  const goToDetails = () => {
    navigate(`/image/${encodeURIComponent(name)}`);
  };

  const handlePlatformChipClick = (event) => {
    const { textContent } = event.target;
    event.stopPropagation();
    event.preventDefault();
    navigate({ pathname: `/explore`, search: createSearchParams({ filter: textContent }).toString() });
  };

  const handleBookmarkClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    api.put(`${host()}${endpoints.bookmarkToggle(name)}`, abortController.signal).then((response) => {
      if (response.status === 200) {
        setCurrentBookmarkValue((prevState) => !prevState);
      }
    });
  };

  const handleStarClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    api.put(`${host()}${endpoints.starToggle(name)}`, abortController.signal).then((response) => {
      if (response.status === 200) {
        setCurrentStarValue((prevState) => !prevState);
        currentStarValue
          ? setCurrentStarCount((prevState) => {
              return !isNaN(prevState) ? prevState - 1 : prevState;
            })
          : setCurrentStarCount((prevState) => {
              return !isNaN(prevState) ? prevState + 1 : prevState;
            });
      }
    });
  };

  const platformChips = () => {
    const filteredPlatforms = uniq(platforms?.flatMap((platform) => [platform.Os, platform.Arch]));
    const hiddenChips = filteredPlatforms.length - MAX_PLATFORM_CHIPS;
    const displayedPlatforms = filteredPlatforms.slice(0, MAX_PLATFORM_CHIPS + 1);
    if (hiddenChips > 0) displayedPlatforms.push(`+${hiddenChips} more`);
    return displayedPlatforms.map((platform, index) => (
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

  const getVendor = () => {
    return `${vendor || 'Vendor not available'} •`;
  };
  const getVersion = () => {
    return `published ${version} •`;
  };
  const getLast = () => {
    const lastDate = lastUpdated
      ? DateTime.fromISO(lastUpdated).toRelative({ unit: ['weeks', 'days', 'hours', 'minutes'] })
      : `Timestamp N/A`;
    return lastDate;
  };

  const renderBookmark = () => {
    return (
      isAuthenticated() && (
        <IconButton component="span" onClick={handleBookmarkClick} data-testid="bookmark-button">
          {currentBookmarkValue ? (
            <BookmarkIcon data-testid="bookmarked" />
          ) : (
            <BookmarkBorderIcon data-testid="not-bookmarked" />
          )}
        </IconButton>
      )
    );
  };

  const renderStar = () => {
    return (
      isAuthenticated() && (
        <IconButton component="span" onClick={handleStarClick} data-testid="star-button">
          {currentStarValue ? <StarIcon data-testid="starred" /> : <StarBorderIcon data-testid="not-starred" />}
        </IconButton>
      )
    );
  };

  const getSignatureChips = () => {
    const cosign = signatureInfo?.map((s) => s.tool).includes(filterConstants.signatureToolConstants.COSIGN)
      ? signatureInfo.filter((si) => si.tool == filterConstants.signatureToolConstants.COSIGN)
      : null;
    const notation = signatureInfo?.map((s) => s.tool).includes(filterConstants.signatureToolConstants.NOTATION)
      ? signatureInfo.filter((si) => si.tool == filterConstants.signatureToolConstants.NOTATION)
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
    <Card
      variant="outlined"
      data-testid="repo-card"
      sx={{
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderRadius: '0.75rem',
        boxShadow: '0rem 0.313rem 0.625rem rgba(131, 131, 131, 0.08)',
        flex: 'none',
        alignSelf: 'stretch',
        flexGrow: 0,
        width: '100%',
        maxWidth: '72rem',
        '&:hover': {
          boxShadow: '0rem 1.1875rem 1.4375rem rgba(131, 131, 131, 0.19)',
          borderRadius: '0.75rem'
        }
      }}
    >
      <CardActionArea
        onClick={goToDetails}
        sx={{
          height: '100%',
          width: '100%',
          borderRadius: '0.75rem',
          borderColor: '#FFFFFF',
          '&:hover .MuiCardActionArea-focusHighlight': {
            opacity: 0
          }
        }}
      >
        <CardContent
          sx={{
            textAlign: 'left',
            color: '#606060',
            maxHeight: '9.25rem',
            backgroundColor: '#FFFFFF',
            padding: '1.188rem 1rem',
            '&:hover': {
              backgroundColor: '#FFFFFF'
            }
          }}
        >
          <Grid container>
            <Grid item xs={12} md={10}>
              <Stack alignItems="center" direction="row" spacing={2}>
                <CardMedia
                  component="img"
                  image={placeholderImage.current}
                  alt="icon"
                  sx={{
                    borderRadius: '3.125rem',
                    height: '1.4375rem',
                    width: '1.4375rem',
                    objectFit: 'fill'
                  }}
                />
                <Tooltip title={name} placement="top">
                  <Typography
                    variant="h5"
                    component="div"
                    noWrap
                    sx={{
                      textOverflow: 'ellipsis',
                      maxWidth: '70%',
                      fontWeight: '600',
                      color: '#0F2139',
                      lineHeight: '2rem'
                    }}
                  >
                    {name}
                  </Typography>
                </Tooltip>
                <div className="hide-on-mobile" style={{ display: 'inline-flex' }}>
                  <VulnerabilityIconCheck {...vulnerabilityData} className="hide-on-mobile" />
                </div>
                {getSignatureChips()}
              </Stack>
              <Tooltip title={description || 'Description not available'} placement="top">
                <Typography
                  pt={1}
                  sx={{
                    fontSize: 12,
                    color: '#52637A',
                    lineHeight: '1.5rem',
                    textOverflow: 'ellipsis',
                    marginBottom: 0,
                    paddingTop: '1rem'
                  }}
                  gutterBottom
                  noWrap
                >
                  {description || 'Description not available'}
                </Typography>
              </Tooltip>
              <Stack alignItems="center" direction="row" spacing={1} pt={1}>
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
                <Tooltip title={lastUpdated?.slice(0, 16) || ' '} placement="top">
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
            <Grid
              item
              container
              xs={2}
              md={2}
              className="hide-on-mobile"
              sx={{
                justifyContent: 'flex-end',
                textAlign: 'end'
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    fontSize: '0.75rem',
                    lineHeight: '1.125rem',
                    color: '#52637A',
                    textAlign: 'end'
                  }}
                >
                  Downloads •
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    fontSize: '0.75rem',
                    lineHeight: '1.125rem',
                    fontWeight: '600',
                    color: '#14191F',
                    textAlign: 'end',
                    marginLeft: '0.5rem'
                  }}
                >
                  {!isNaN(downloads) ? downloads : `not available`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {renderStar()}
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    fontSize: '0.75rem',
                    lineHeight: '1.125rem',
                    color: '#52637A',
                    textAlign: 'end'
                  }}
                >
                  Stars •
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    fontSize: '0.75rem',
                    lineHeight: '1.125rem',
                    fontWeight: '600',
                    color: '#14191F',
                    textAlign: 'end',
                    marginLeft: '0.5rem'
                  }}
                >
                  {!isNaN(currentStarCount) ? currentStarCount : `not available`}
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                sx={{
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}
              >
                <Grid item>{renderBookmark()}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RepoCard;
