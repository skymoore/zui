import React, { useEffect, useMemo, useState } from 'react';

// components
import { Stack, Typography } from '@mui/material';
import LayerCard from '../../Shared/LayerCard.jsx';
import Loading from '../../Shared/Loading';

function HistoryLayers(props) {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const abortController = useMemo(() => new AbortController(), []);
  const { name, history } = props;

  useEffect(() => {
    setHistoryData(history);
    setIsLoading(false);
    return () => {
      abortController.abort();
    };
  }, [name, history]);

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        align="left"
        sx={{
          marginBottom: '1.7rem',
          color: 'rgba(0, 0, 0, 0.87)',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}
      >
        Layers
      </Typography>
      {isLoading ? (
        <Loading />
      ) : (
        <Stack direction="column" spacing={2} sx={{ marginTop: '1.7rem' }} data-testid="layer-card-container">
          {historyData?.length > 0 ? (
            historyData.map((layer, index) => {
              return (
                <LayerCard
                  key={`${layer?.Layer?.Size}${index}`}
                  index={index + 1}
                  layer={layer?.Layer}
                  historyDescription={layer?.HistoryDescription}
                />
              );
            })
          ) : (
            <div>
              <Typography
                sx={{
                  color: '#52637A',
                  fontSize: '1.4rem',
                  fontWeight: '600'
                }}
              >
                {' '}
                No Layer data available{' '}
              </Typography>
            </div>
          )}
        </Stack>
      )}
    </>
  );
}

export default HistoryLayers;
