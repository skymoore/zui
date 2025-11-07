// react global
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

import { isAuthenticated, isAuthenticationEnabled, logoutUser } from '../../utilities/authUtilities';

// components
import { AppBar, Toolbar, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchSuggestion from './SearchSuggestion';
import UserAccountMenu from './UserAccountMenu';
// styling
import logo from '../../assets/zotLogoWhite.svg';
import logoxs from '../../assets/zotLogoWhiteSmall.svg';
import githubLogo from '../../assets/Git.png';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  backgroundColor: '#0F2139',
  height: '100%',
  width: '100%',
  borderBottom: '0.0625rem solid #BDBDBD',
  boxShadow: '0rem 0.3125rem 0.625rem rgba(131, 131, 131, 0.08)'
});

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '2.875rem',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-between'
  }
}));

const GridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const HeaderLinkContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const HeaderLink = styled('a')({
  color: '#F6F7F9',
  fontSize: '1rem',
  fontWeight: 600
});

const Logo = styled('img')({
  maxWidth: '130px',
  maxHeight: '30px'
});

const SignInButton = styled(Button)({
  border: '1px solid #F6F7F9',
  borderRadius: '0.625rem',
  backgroundColor: 'transparent',
  color: '#F6F7F9',
  fontSize: '1rem',
  textTransform: 'none',
  fontWeight: 600
});

function setNavShow() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(null);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY < lastScrollY) {
        setShow(true);
      } else {
        setShow(false);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);
  return show;
}

function Header({ setSearchCurrentValue = () => {} }) {
  const show = setNavShow();
  const path = useLocation().pathname;

  const handleSignInClick = () => {
    logoutUser();
  };

  return (
    <AppBar position={show ? 'fixed' : 'absolute'} sx={{ height: '5rem' }}>
      <StyledToolbar>
        <StyledGrid container>
          <GridItem item container xs={3} md={4} spacing="1.5rem">
            <Grid item>
              <Link to="/home">
                <picture>
                  <source media="(min-width:600px)" srcSet={logo} />
                  <Logo alt="zot" src={logoxs} />
                </picture>
              </Link>
            </Grid>
            <HeaderLinkContainer item>
              <HeaderLink href="https://zotregistry.dev" target="_blank" rel="noreferrer">
                Product
              </HeaderLink>
            </HeaderLinkContainer>
            <HeaderLinkContainer item>
              <HeaderLink href="https://zotregistry.dev/v2.0.0/general/concepts/" target="_blank" rel="noreferrer">
                Docs
              </HeaderLink>
            </HeaderLinkContainer>
          </GridItem>
          <GridItem item xs={6} md={4}>
            {path !== '/' && <SearchSuggestion setSearchCurrentValue={setSearchCurrentValue} />}
          </GridItem>
          <GridItem item container xs={2} md={3} spacing="1.5rem">
            <HeaderLinkContainer item>
              <HeaderLink href="https://github.com/project-zot/zot" target="_blank" rel="noreferrer">
                <Logo alt="github repository" src={githubLogo} />
              </HeaderLink>
            </HeaderLinkContainer>
            {isAuthenticated() && isAuthenticationEnabled() && (
              <Grid item>
                <UserAccountMenu />
              </Grid>
            )}
            {!isAuthenticated() && isAuthenticationEnabled() && (
              <Grid item>
                <SignInButton onClick={handleSignInClick}>Sign in</SignInButton>
              </Grid>
            )}
          </GridItem>
        </StyledGrid>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
