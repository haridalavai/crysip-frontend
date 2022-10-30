import React, { useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Grid } from "@mui/material";
import CrypotCard from "./CrypotCard";

import { CrypotContext } from "../../../../contexts/Crypots";
import Crypot from "../../../../abis/contracts/Crypot.sol/Crypot.json";

const Explore = () => {
  const crypotContext = useContext(CrypotContext);
  return (
    <Grid container spacing={4}>
      <Grid item sm={12}>
        Explore
      </Grid>

      {crypotContext.crypots.map((crypot) => (
        <Grid item sm={6} md={4}>
          <CrypotCard crypot={crypot} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Explore;
