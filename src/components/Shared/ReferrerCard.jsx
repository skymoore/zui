import React, { useState } from 'react';
import { Card, CardContent, Stack, Tooltip, Typography, Collapse, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';

const StyledCard = styled(Card)({
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  background: '#FFFFFF',
  boxShadow: '0rem 0.3125rem 0.625rem rgba(131, 131, 131, 0.08)',
  borderRadius: '1.875rem',
  flex: 'none',
  alignSelf: 'stretch',
  flexGrow: 0,
  order: 0,
  width: '100%'
});

const StyledCardContent = styled(CardContent)({
  textAlign: 'left',
  color: '#606060',
  padding: '2% 3% 2% 3%',
  width: '100%'
});

const DropdownIcon = styled('div')({
  color: '#1479FF',
  paddingTop: '1rem',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  textAlign: 'center'
});

export default function ReferrerCard(props) {
  const { artifactType, mediaType, size, digest, annotations } = props;
  const [digestDropdownOpen, setDigestDropdownOpen] = useState(false);
  const [annotationDropdownOpen, setAnnotationDropdownOpen] = useState(false);

  return (
    <StyledCard raised>
      <StyledCardContent>
        <Typography
          variant="body1"
          align="left"
          sx={{
            color: '#000000',
            fontSize: '1rem',
            paddingBottom: '0.5rem',
            paddingTop: '0.5rem',
            textOverflow: 'ellipsis'
          }}
        >
          Type: {artifactType && `${artifactType}`}
        </Typography>
        <Typography
          variant="body1"
          align="left"
          sx={{
            color: '#000000',
            fontSize: '1rem',
            paddingBottom: '0.5rem',
            paddingTop: '0.5rem',
            textOverflow: 'ellipsis'
          }}
        >
          Media type: {mediaType && `${mediaType}`}
        </Typography>
        <Typography
          variant="body1"
          align="left"
          sx={{
            color: '#000000',
            fontSize: '1rem',
            paddingBottom: '0.5rem',
            paddingTop: '0.5rem',
            textOverflow: 'ellipsis'
          }}
        >
          Size: {size && `${size}`}
        </Typography>
        <Stack direction="row" onClick={() => setDigestDropdownOpen(!digestDropdownOpen)}>
          {!digestDropdownOpen ? <DropdownIcon as={KeyboardArrowRight} /> : <DropdownIcon as={KeyboardArrowDown} />}
          <Typography
            sx={{
              color: '#1479FF',
              paddingTop: '1rem',
              fontSize: '0.8125rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            DIGEST
          </Typography>
        </Stack>
        <Collapse in={digestDropdownOpen} timeout="auto" unmountOnExit>
          <Box>
            <Grid container item xs={12} direction={'row'}>
              <Tooltip title={digest || ''} placement="top">
                <Typography variant="body1">{digest}</Typography>
              </Tooltip>
            </Grid>
          </Box>
        </Collapse>

        <Stack direction="row" onClick={() => setAnnotationDropdownOpen(!annotationDropdownOpen)}>
          {!annotationDropdownOpen ? <DropdownIcon as={KeyboardArrowRight} /> : <DropdownIcon as={KeyboardArrowDown} />}
          <Typography
            sx={{
              color: '#1479FF',
              paddingTop: '1rem',
              fontSize: '0.8125rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ANNOTATIONS
          </Typography>
        </Stack>
        <Collapse in={annotationDropdownOpen} timeout="auto" unmountOnExit>
          <Box>
            <Grid container item xs={12} direction={'row'}>
              <ul>
                {annotations?.map((annotation) => (
                  <li key={annotation.key}>
                    <Typography variant="body1">{`${annotation?.key}: ${annotation?.value}`}</Typography>
                  </li>
                ))}
              </ul>
            </Grid>
          </Box>
        </Collapse>
      </StyledCardContent>
    </StyledCard>
  );
}
