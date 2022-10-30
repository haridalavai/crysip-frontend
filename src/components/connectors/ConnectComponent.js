import React from 'react';
import { Box, Typography } from '@mui/material';
import Connectors from './index';

const ConnectComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'regular', marginBottom: '10px' }}>
          Please connect to wallet
        </Typography>
        <Connectors />
      </Box>
    </Box>
  );
};

export default ConnectComponent;
