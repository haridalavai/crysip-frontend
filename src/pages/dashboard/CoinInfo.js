import { Grid, LinearProgress } from "@mui/material";
import axios from "axios";
import merge from "lodash/merge";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HistoricalDataChart from "../../sections/@dashboard/general/coinInfo/HistoricalDataChart";
import { HistoricalChart, SingleCoin } from "../../api/coinGecko";
import Sidebar from "../../sections/@dashboard/general/coinInfo/Sidebar";
import { BaseOptionChart } from "../../components/chart";

const CoinInfo = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCoin = async () => {
    console.log(id);
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
    console.log(data);
  };

  const fetchHistoricData = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(id, "usd", days));
    setHistoricData(data.prices);
    console.log(data.prices);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  if (!coin) return <LinearProgress />;

  return (
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <Sidebar coin={coin} />
      </Grid>
      <Grid item sm={12}>
        <HistoricalDataChart historicData={historicData} id={id} days={days} setDays={setDays} loading={loading} />
      </Grid>
    </Grid>
  );
};

export default CoinInfo;
