import React, { useState } from 'react';
import { Card, Grid, Slider, TextField } from '@mui/material';
import Label from '../../../../components/Label';

const DistributionSlider = ({ currency, changePercentage }) => {
  const [percent, setPercent] = useState(0);

  return (
    <Card sx={{ margin: '3px 0', padding: '10px', width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {`${currency.name}`}
          <Label variant="filled">{percent} %</Label>
        </Grid>
        <Grid item xs={12}>
          <Slider
            aria-label="Temperature"
            onChange={(e) => {
              setPercent(e.target.value);
              changePercentage(currency.name, e.target.value);
            }}
            value={currency.percent}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default DistributionSlider;
