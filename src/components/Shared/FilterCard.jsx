import { Card, CardContent, Checkbox, FormControlLabel, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { isArray, isNil } from 'lodash';
import React from 'react';

const StyledCard = styled(Card)({
  display: 'flex',
  minWidth: '15%',
  alignItems: 'flex-start',
  background: '#FFFFFF',
  boxShadow: '0rem 0.313rem 0.625rem rgba(131, 131, 131, 0.08)',
  borderColor: '#FFFFFF',
  borderRadius: '0.75rem',
  color: '#14191F'
});

const StyledCardContent = styled(CardContent)({
  '&:last-child': {
    padding: '1rem'
  }
});

const CardTitle = styled(Typography)({
  fontWeight: '600',
  fontSize: '1.25rem',
  lineHeight: '1.75rem',
  letterSpacing: '-0.01rem',
  marginBottom: '1rem'
});

const StyledFormControlLabel = styled(FormControlLabel)({
  marginLeft: '0',
  marginRight: '0'
});

function FilterCard(props) {
  const { title, filters, updateFilters, filterValue, wrapperLoading } = props;

  const handleFilterClicked = (event, changedFilterValue) => {
    const { checked } = event.target;
    if (checked) {
      if (!isArray(filterValue)) {
        updateFilters({ ...filterValue, [changedFilterValue]: true });
      } else {
        updateFilters([...filterValue, changedFilterValue]);
      }
    } else {
      if (!isArray(filterValue)) {
        updateFilters({ ...filterValue, [changedFilterValue]: false });
      } else {
        updateFilters(filterValue.filter((e) => e !== changedFilterValue));
      }
      // setSelectedFilter(null);
    }
  };

  const getCheckboxStatus = (filter) => {
    if (isNil(filter)) {
      return false;
    }
    if (isArray(filterValue)) {
      return filterValue?.includes(filter.label);
    }
    return filterValue[filter.value] || false;
  };

  const getFilterRows = () => {
    const filterRows = filters;
    return filterRows.map((filter, index) => {
      return (
        <Tooltip key={index} title={filter.tooltip ?? filter.label} placement="top" arrow>
          <StyledFormControlLabel
            componentsProps={{
              typography: {
                variant: 'body2',
                sx: (theme) => ({
                  fontSize: '1rem',
                  color: theme.palette.secondary.dark,
                  lineHeight: '1.5rem',
                  paddingLeft: '0.5rem'
                })
              }
            }}
            control={<Checkbox sx={{ padding: '0.188rem', color: '#52637A' }} />}
            label={filter.label}
            id={title}
            checked={getCheckboxStatus(filter)}
            onChange={() => handleFilterClicked(event, filter.value)}
            disabled={wrapperLoading}
          />
        </Tooltip>
      );
    });
  };

  return (
    <StyledCard variant="outlined">
      <StyledCardContent>
        <CardTitle>{title || 'Filter Title'}</CardTitle>
        <Stack direction="column">{getFilterRows()}</Stack>
      </StyledCardContent>
    </StyledCard>
  );
}

export default FilterCard;
