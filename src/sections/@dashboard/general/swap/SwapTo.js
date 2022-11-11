import { Card, Grid, IconButton, Button } from "@mui/material";
import React, { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import SwapToCard from "./SwapToCard";
import Iconify from "../../../../components/Iconify";
import { currencyList } from "../../../../constants/currencies";

const SwapTo = ({ currencyToArray, setPercent, setCurrency, onAddCurrency }) => {
  const theme = useTheme();

  return (
    <Card sx={{ padding: "20px", boxShadow: "none", border: `` }}>
      <Grid container spacing={3}>
        {currencyToArray.map((currency) => (
          <Grid item xs={6}>
            <SwapToCard currency={currency} setPercent={setPercent} setCurrency={setCurrency} />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Card sx={{ boxShadow: "none", border: `` }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button size="large" sx={{ width: "100%", height: "100%" }} onClick={onAddCurrency}>
                  <Iconify icon={"eva:plus-fill"} />
                  add currency
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SwapTo;
