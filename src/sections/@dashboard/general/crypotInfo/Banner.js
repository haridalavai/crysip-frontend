import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import { useWeb3React } from "@web3-react/core";
import { capitalizeFirstLetter } from "../../../../utils/formatString";
import Avatar from "../../../../components/crypotInfo/Avatar";
import useCrypot from "../../../../hooks/useCrypot";

const Banner = ({ crypotData, calculateCagr }) => {
  const theme = useTheme();
  const [cagr, setCagr] = useState(0);
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  useEffect(() => {
    const fetchData = async () => {
      const cagr = await calculateCagr(crypotData._currencies);
      console.log(cagr);

      setCagr(cagr);
    };
    fetchData();
  }, [active, calculateCagr, crypotData._currencies]);

  return (
    <Box>
      {active && (
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item>
            <Avatar name={crypotData?._name} />
          </Grid>
          <Grid item md={6}>
            <Typography variant="body1" sx={{ fontSize: "25px" }}>
              {capitalizeFirstLetter(crypotData?._name)}
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              {capitalizeFirstLetter(crypotData?._description?.substr(0, 50))}
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography
              sx={{
                padding: "0px 0px 5px 0px",
                fontSize: "14px",
                fontWeight: "light",
                color: theme.palette.text.secondary,
              }}
              variant="body2"
            >
              3Y CAGR
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.success.main }}>
              {cagr.toFixed(2)}%
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography
              sx={{
                padding: "0px 0px 5px 0px",
                fontSize: "14px",
                fontWeight: "light",
                color: theme.palette.text.secondary,
              }}
              variant="body2"
            >
              Min Amount
            </Typography>
            <Typography variant="body1">1 USDT</Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Banner;
