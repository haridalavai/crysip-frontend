import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useWeb3React } from "@web3-react/core";
import { Box, Card, Grid } from "@mui/material";
import axios from "axios";
import { getTokenFromAddress } from "../../api/moralis";
import Crypot from "../../abis/contracts/Crypot.sol/Crypot.json";
import { HistoricalChart, Search } from "../../api/coinGecko";
import useCrypot from "../../hooks/useCrypot";
import Banner from "../../sections/@dashboard/general/crypotInfo/Banner";
import Invest from "../../sections/@dashboard/general/crypotInfo/Invest";
import Overview from "../../sections/@dashboard/general/crypotInfo/Overview";
import { CrypotContext } from "../../contexts/Crypots";

const CrypotsInfo = () => {
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  const [crypotData, setCrypotData] = useState({});
  const [currencyIds, setCurrencyIds] = useState([]);
  const [defiPulse, setDefiPulse] = useState([]);
  const DEFI_PULSE = "defipulse-index";

  const { id } = useParams();
  const { crypotContract, getCrypotData, calculateCagr } = useCrypot(id);

  useEffect(() => {
    const dataFetch = async () => {
      if (active) {
        const CrypotContract = new library.eth.Contract(Crypot.abi, id);
        const crypots = await CrypotContract.methods.getCrypotData().call();
        const c = await getCurrencyData(crypots._currencies);
        console.log(c);
        setCrypotData(crypots);
        setCurrencyIds(c);
        const defiData = await getDefiHistoricData();
        setDefiPulse(defiData);
      }
    };
    dataFetch();
  }, [active, id]);

  const getCurrencyData = async (currencies, days = 356) => {
    const cd = [];

    const p = currencies?.map(async (currency) => {
      const res = await getTokenFromAddress("bsc%20testnet", currency);
      const { data } = await axios.get(Search(res[0].symbol));
      const cdata = await axios.get(HistoricalChart(data.coins[0].id, "usd", days));
      cd.push(cdata.data);
    });
    await Promise.all(p);
    return cd;
  };

  const getDefiHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(DEFI_PULSE, "usd", 365));
    return data;
  };

  return (
    <>
      {/* {active && ( */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ padding: "20px" }}>
            <Banner crypotData={crypotData} calculateCagr={calculateCagr} />
          </Card>
        </Grid>
        <Grid item md={12} lg={8}>
          <Overview
            crypotData={crypotData}
            calculateCagr={calculateCagr}
            currencyIds={currencyIds}
            key={id}
            defiPulse={defiPulse}
          />
        </Grid>
        <Grid item xs={4}>
          <Invest crypotData={crypotData} id={id} />
        </Grid>
      </Grid>
      {/* )} */}
    </>
  );
};

export default CrypotsInfo;
