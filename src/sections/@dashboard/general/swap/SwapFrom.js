import React, { useState, useEffect } from "react";
import { Card, TextField, CircularProgress, MenuItem, Grid, Typography } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { useWeb3React } from "@web3-react/core";
import Scrollbar from "../../../../components/Scrollbar";
import { currencyList } from "../../../../constants/currencies";
import Label from "../../../../components/Label";
import wbnb from "../../../../abis/wbnb/wbnb.json";

const SwapFrom = ({
  fromToken,
  balance,
  fromAmount,
  fromTokenContract,
  loading,
  setBalance,
  setFromAmount,
  setFromToken,
  setFromTokenContract,
  setLoading,
}) => {
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();

  const theme = useTheme();

  // useEffect(async () => {
  //   // handleFromTokenChange();
  // }, [fromToken]);

  const handleFromTokenChange = (event) => {
    setLoading(true);
    console.log(event);
    setFromToken(event.target.value);
    const fromTokenContract = new library.eth.Contract(wbnb.abi, event.target.value);
    setFromTokenContract(fromTokenContract);
  };

  const handleFromAmountChange = (event) => {
    setFromAmount(event.target.value);
  };

  return (
    <Card sx={{ padding: "20px", boxShadow: "none", border: `` }}>
      <Grid container spacing={1} sx={{ alignItems: "flex-end" }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fromToken}
            label="Currency"
            onChange={handleFromTokenChange}
          >
            {currencyList.map((currency) => (
              <MenuItem key={currency.name} value={currency.value} n={currency.name}>
                {currency.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="amount" value={fromAmount} onChange={handleFromAmountChange} />
        </Grid>
        <Grid item xs={12}>
          <Label>
            Available Balance : {balance}
            {loading && <CircularProgress size={10} />}
          </Label>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SwapFrom;
