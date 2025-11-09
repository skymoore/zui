import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.3rem 1rem',
  minHeight: 'auto',
  height: 'auto',
  backgroundColor: '#f5f5f5',
  borderTop: '1px solid #e0e0e0',
  marginTop: 'auto'
});

const FooterLink = styled('a')({
  color: '#666',
  textDecoration: 'none',
  fontSize: '0.75rem',
  lineHeight: '1.2',
  '&:hover': {
    textDecoration: 'underline'
  }
});

function Footer() {
  return (
    <FooterContainer>
      <FooterLink href="https://github.com/project-zot/zot" target="_blank" rel="noreferrer">
        powered by zot
      </FooterLink>
    </FooterContainer>
  );
}

export default Footer;
