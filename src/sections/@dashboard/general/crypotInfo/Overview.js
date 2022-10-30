import { Card, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";
import Graph from "../../../../components/crypotInfo/Graph";

const Overview = ({ crypotData, calculateCagr, currencyIds, defiPulse }) => {
  const theme = useTheme();
  console.log(crypotData);
  return (
    <Card sx={{ padding: "20px" }}>
      <Grid container spacing={4}>
        <Grid item sx={12}>
          <Card sx={{ padding: "20px", border: `1px solid ${theme.palette.primary.main}`, width: "100%" }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "light",
                  }}
                  variant="h4"
                >
                  Overview
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography
                  sx={{
                    padding: "0px 0px 5px 0px",
                    fontSize: "16px",
                    fontWeight: "light",
                    color: theme.palette.text.secondary,
                  }}
                  variant="body2"
                >
                  Currencies
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.main }}>
                  {crypotData?._currencies?.length}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography
                  sx={{
                    padding: "0px 0px 5px 0px",
                    fontSize: "16px",
                    fontWeight: "light",
                    color: theme.palette.text.secondary,
                  }}
                  variant="body2"
                >
                  Rebalance Frequency
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.main }}>
                  Quarterly
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography
                  sx={{
                    padding: "0px 0px 5px 0px",
                    fontSize: "16px",
                    fontWeight: "light",
                    color: theme.palette.text.secondary,
                  }}
                  variant="body2"
                >
                  Last Rebalance
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.main }}>
                  Apr 1, 2022
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography
                  sx={{
                    padding: "0px 0px 5px 0px",
                    fontSize: "16px",
                    fontWeight: "light",
                    color: theme.palette.text.secondary,
                  }}
                  variant="body2"
                >
                  Next Rebalance
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.main }}>
                  Jul 4, 2022
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ padding: "20px", border: `1px solid ${theme.palette.primary.main}` }}>
            <Graph currencyIds={currencyIds} crypotData={crypotData} defiPulse={defiPulse} />
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Overview;
