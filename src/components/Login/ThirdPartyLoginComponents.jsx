import React from 'react';

import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import githubLogo from '../../assets/GhIcon.svg';

const GithubButton = styled(Button)({
  textTransform: 'none',
  background: '#161614',
  color: '#FFFFFF',
  borderRadius: '0.25rem',
  padding: 0,
  height: '3.125rem',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#161614',
    boxShadow: 'none'
  }
});

const GoogleButton = styled(Button)({
  textTransform: 'none',
  background: '#FFFFFF',
  color: '#52637A',
  borderRadius: '0.25rem',
  border: '1px solid #52637A',
  padding: 0,
  height: '3.125rem',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#FFFFFF',
    boxShadow: 'none'
  }
});

const ButtonText = styled('span')({
  lineHeight: '2.125rem',
  height: '2.125rem',
  fontSize: '1.438rem',
  fontWeight: '600',
  letterSpacing: '0.01rem'
});

function GithubLoginButton({ handleClick }) {
  return (
    <GithubButton
      fullWidth
      variant="contained"
      endIcon={<SvgIcon fontSize="medium">{githubLogo}</SvgIcon>}
      onClick={(e) => handleClick(e, 'github')}
    >
      <ButtonText>Continue with Github</ButtonText>
    </GithubButton>
  );
}

function GoogleLoginButton({ handleClick }) {
  return (
    <GoogleButton fullWidth variant="contained" onClick={(e) => handleClick(e, 'google')}>
      <ButtonText>Continue with Google</ButtonText>
    </GoogleButton>
  );
}

function GitlabLoginButton({ handleClick }) {
  return (
    <Button fullWidth variant="contained" onClick={(e) => handleClick(e, 'gitlab')}>
      Sign in with Gitlab
    </Button>
  );
}

function OIDCLoginButton({ handleClick, oidcName }) {
  const loginWithName = oidcName || 'OIDC';

  return (
    <Button fullWidth variant="contained" onClick={(e) => handleClick(e, 'oidc')}>
      Sign in with {loginWithName}
    </Button>
  );
}

export { GithubLoginButton, GoogleLoginButton, GitlabLoginButton, OIDCLoginButton };
