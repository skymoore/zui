// react global
import { Link, useLocation, useNavigate } from 'react-router';

// components
import { Typography, Breadcrumbs } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

const ExploreHeaderContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  minHeight: 50,
  padding: '2.75rem 0 1.25rem 0',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  [theme.breakpoints.down('md')]: {
    padding: '1rem'
  }
}));

const ExploreText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: '0.813rem',
  fontWeight: '600',
  letterSpacing: '0.009375rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem'
  }
}));

const StyledArrowBackIcon = styled(ArrowBackIcon)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  marginRight: '1.75rem',
  fontSize: { xs: '1.5rem', md: '2rem' },
  cursor: 'pointer'
}));

function ExploreHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const pathWithoutImage = path.replace('tag/', '');
  const pathToBeDisplayed = pathWithoutImage.replace('/image/', '');
  const pathHeader = pathToBeDisplayed.replace('/', ' / ').replace(/%2F/g, '/');
  const pathWithTag = path.substring(0, path.lastIndexOf('/'));

  return (
    <ExploreHeaderContainer>
      <StyledArrowBackIcon onClick={() => navigate(-1)} />
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        <Link to="/">
          <ExploreText variant="body1">Home</ExploreText>
        </Link>
        <Link to={pathWithTag.substring(0, pathWithTag.lastIndexOf('/'))}>
          {path.includes('/image/') && <ExploreText variant="body1">{pathHeader}</ExploreText>}
        </Link>
      </Breadcrumbs>
      <div></div>
    </ExploreHeaderContainer>
  );
}

export default ExploreHeader;
