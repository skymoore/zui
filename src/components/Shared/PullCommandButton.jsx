import React, { useState, useEffect, useRef } from 'react';

import { Grid, Button, FormControl, Menu, MenuItem, Box, Tab, InputBase, IconButton, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { dockerPull, podmanPull, skopeoPull } from 'utilities/pullStrings';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CopyStringSelect = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})(({ theme, isOpen }) => ({
  '& fieldset': {
    border: ' 0.0625rem solid #52637A'
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  width: '100%',
  height: '100%',
  backgroundColor: isOpen ? '#FFFFFF' : theme.palette.secondary.main,
  borderRadius: '0.5rem',
  color: isOpen ? '#00000099' : '#F6F7F9',
  fontFamily: 'Roboto',
  fontSize: '1rem',
  fontWeight: 600,
  textAlign: 'left',
  textTransform: 'none'
}));

const PullStringBoxCopied = styled(Button)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: '#2EAE4E',
  padding: '0rem 1rem 0rem 1rem',
  fontFamily: 'Roboto',
  fontSize: '1rem',
  color: '#FFFFFF',
  border: '0.0625rem solid rgba(0, 0, 0, 0.23)',
  borderRadius: '0.5rem',
  height: '3.5rem',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2EAE4E'
  }
});

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  height: '100%',
  paddingLeft: '0rem!important',
  [theme.breakpoints.down('md')]: {
    padding: '1.5rem 0'
  }
}));

const StyledMenuItem = styled(MenuItem)({
  width: '100%',
  overflow: 'hidden',
  padding: '0rem',
  '&:hover': { backgroundColor: '#FFFFFF' },
  '&:focus': { backgroundColor: '#FFFFFF' },
  '&.Mui-focusVisible': {
    backgroundColor: '#FFFFFF!important'
  }
});

const CopyButtonContainer = styled(Grid)({
  borderLeft: '0.0625rem solid rgba(0, 0, 0, 0.23)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
});

function PullCommandButton(props) {
  const { imageName } = props;

  const [anchor, setAnchor] = useState();
  const open = Boolean(anchor);
  const [pullString, setPullString] = useState(dockerPull(imageName));
  const [isCopied, setIsCopied] = useState(false);
  const [selectedPullTab, setSelectedPullTab] = useState(dockerPull(imageName));

  const mounted = useRef(false);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(pullString);
    setIsCopied(true);
    setAnchor(null);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const getButtonIcon = () => {
    if (open) {
      return <ExpandLessIcon sx={{ fill: '#00000099' }} />;
    }
    return <ExpandMoreIcon sx={{ fill: '#F6F7F9' }} />;
  };

  const handlePullTabChange = (event, newValue) => {
    setSelectedPullTab(newValue);
    setPullString(newValue);
  };

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        if (mounted.current) {
          setIsCopied(false);
        }
      }, 2000);
    }
  }, [isCopied]);

  return isCopied ? (
    <PullStringBoxCopied data-testid="successPulled-buton">
      Copied Pull Command
      <CheckCircleIcon />
    </PullStringBoxCopied>
  ) : (
    <FormControl variant="outlined" sx={{ width: '100%', height: '3.5rem' }}>
      <CopyStringSelect onClick={handleClick} isOpen={open} disableRipple>
        Pull {imageName}
        {getButtonIcon()}
      </CopyStringSelect>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: anchor?.offsetWidth || '24%' } }}
        disableScrollLock
        data-testid="pull-dropdown"
      >
        <StyledMenuItem disableRipple data-testid="pull-menuItem">
          <TabContext value={selectedPullTab}>
            <Box>
              <TabList
                onChange={handlePullTabChange}
                TabIndicatorProps={{
                  sx: {
                    background: '#D83C0E',
                    borderRadius: '1.5rem'
                  }
                }}
                sx={{ '& button.Mui-selected': { color: '#14191F', fontWeight: '600' } }}
              >
                <Tab value={dockerPull(imageName)} label="Docker" sx={{ height: '100%' }} />
                <Tab value={podmanPull(imageName)} label="Podman" sx={{ height: '100%' }} />
                <Tab value={skopeoPull(imageName)} label="Skopeo" sx={{ height: '100%' }} />
              </TabList>
              <Grid container>
                <Grid item xs={12}>
                  <StyledTabPanel value={dockerPull(imageName)}>
                    <Box sx={{ padding: '0.5rem' }}>
                      <Grid
                        container
                        item
                        xs={12}
                        sx={{
                          width: '19.365rem',
                          border: '0.0625rem solid rgba(0, 0, 0, 0.23)',
                          borderRadius: '0.5rem',
                          padding: '0rem 0rem',
                          fontSize: '1rem'
                        }}
                      >
                        <Grid item xs={10}>
                          <InputBase
                            sx={{
                              padding: '0rem 1rem',
                              '& input': {
                                width: '14.5rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }
                            }}
                            onKeyDownCapture={(e) => e.preventDefault()}
                            defaultValue={dockerPull(imageName)}
                          />
                        </Grid>
                        <CopyButtonContainer item xs={2} onClick={handleCopyClick}>
                          <IconButton aria-label="copy" data-testid="pullcopy-btn">
                            <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </CopyButtonContainer>
                      </Grid>
                    </Box>
                  </StyledTabPanel>
                  <StyledTabPanel value={podmanPull(imageName)}>
                    <Box sx={{ padding: '0.5rem' }}>
                      <Grid
                        container
                        item
                        xs={12}
                        sx={{
                          width: '19.365rem',
                          border: '0.0625rem solid rgba(0, 0, 0, 0.23)',
                          borderRadius: '0.5rem',
                          padding: '0rem 0rem',
                          fontSize: '1rem'
                        }}
                      >
                        <Grid item xs={10}>
                          <InputBase
                            sx={{
                              padding: '0rem 1rem',
                              '& input': {
                                width: '14.5rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }
                            }}
                            onKeyDownCapture={(e) => e.preventDefault()}
                            defaultValue={podmanPull(imageName)}
                            data-testid="podman-input"
                          />
                        </Grid>
                        <CopyButtonContainer item xs={2} onClick={handleCopyClick}>
                          <IconButton aria-label="copy" data-testid="podmanPullcopy-btn">
                            <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </CopyButtonContainer>
                      </Grid>
                    </Box>
                  </StyledTabPanel>
                  <StyledTabPanel value={skopeoPull(imageName)}>
                    <Box sx={{ padding: '0.5rem' }}>
                      <Grid
                        container
                        item
                        xs={12}
                        sx={{
                          width: '19.365rem',
                          border: '0.0625rem solid rgba(0, 0, 0, 0.23)',
                          borderRadius: '0.5rem',
                          padding: '0rem 0rem',
                          fontSize: '1rem'
                        }}
                      >
                        <Grid item xs={10}>
                          <InputBase
                            sx={{
                              padding: '0rem 1rem',
                              '& input': {
                                width: '14.5rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }
                            }}
                            onKeyDownCapture={(e) => e.preventDefault()}
                            defaultValue={skopeoPull(imageName)}
                          />
                        </Grid>
                        <CopyButtonContainer item xs={2} onClick={handleCopyClick}>
                          <IconButton aria-label="copy" data-testid="skopeoPullcopy-btn">
                            <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </CopyButtonContainer>
                      </Grid>
                    </Box>
                  </StyledTabPanel>
                </Grid>
              </Grid>
            </Box>
          </TabContext>
        </StyledMenuItem>
      </Menu>
    </FormControl>
  );
}

export default PullCommandButton;
