import React, { useState } from "react";
import { Box, Button, Card, LinearProgress } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import merge from "lodash/merge";
import { BaseOptionChart } from "../../../../components/chart";
import DaysButton from "../../../../components/coinInfo/DaysButton";

const HistoricalDataChart = ({ historicData, id, days, setDays, loading }) => {
  const labels = historicData?.map((coin) => {
    const date = new Date(coin[0]);
    const time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  });
  const data = [{ name: id, data: historicData?.map((coin) => coin[1].toFixed(2)) }];
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: labels,
    },
  });
  return (
    <Card sx={{ padding: "20px" }}>
      {loading ? <LinearProgress /> : <ReactApexChart type="line" series={data} options={chartOptions} height={364} />}
      <Box sx={{ padding: "15px" }}>
        <DaysButton setDays={setDays} days={1} selected={days === 1} content="1 Day" />
        <DaysButton setDays={setDays} days={30} selected={days === 30} content="30 Days" />
        <DaysButton setDays={setDays} days={90} selected={days === 90} content="3 Months" />
        <DaysButton setDays={setDays} days={365} selected={days === 365} content="1 Year" />
      </Box>
    </Card>
  );
};

export default HistoricalDataChart;
