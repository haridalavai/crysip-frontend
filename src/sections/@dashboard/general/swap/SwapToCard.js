import { Card, Grid, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { currencyList } from "../../../../constants/currencies";
import Label from "../../../../components/Label";

const SwapToCard = ({ currency, setCurrency, setPercent }) => {
  const [currencyTo, setCurrencyTo] = useState();
  const [percentTo, setPercentTo] = useState();
  const theme = useTheme();
  return (
    <Card sx={{ padding: "20px", border: `0.5px solid ${theme.palette.secondary.main}` }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currencyTo}
            label="Currency"
            onChange={(event) => {
              setCurrency(currency.key, event.target.value);
              setCurrencyTo(event.target.value);
            }}
          >
            {currencyList.map((currency) => (
              <MenuItem key={currency.name} value={currency.value}>
                {currency.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="percent"
            size="small"
            value={percentTo}
            onChange={(event) => {
              setPercent(currency.key, event.target.value);
              setPercentTo(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Label size="large">~123 USDT</Label>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SwapToCard;
