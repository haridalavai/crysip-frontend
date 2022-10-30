import { merge } from "lodash";
import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { BaseOptionChart } from "../chart";

const Graph = ({ currencyIds = [], crypotData, days = 365, defiPulse }) => {
  console.log(currencyIds, "overview defi");
  useEffect(() => {}, [defiPulse]);

  const labels = defiPulse?.prices?.map((coin) => {
    const date = new Date(coin[0]);
    const time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  });

  const crypotDatas = [];

  currencyIds[0]?.prices?.forEach((p) => {
    crypotDatas.push(0);
  });

  currencyIds.forEach((currency, index) => {
    currency?.prices?.forEach((price, index) => {
      crypotDatas[index] += price[1];
    });
  });

  console.log(crypotDatas, "crypotDatas");
  const data = [
    {
      name: "Defi Pulse",
      data: defiPulse?.prices?.map((coin) => coin[1].toFixed(2)),
    },
    {
      name: crypotData._name,
      data: crypotDatas,
    },
  ];
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: labels,
    },
  });

  return (
    <div>
      <ReactApexChart type="line" series={data} options={chartOptions} height={364} />
    </div>
  );
};

export default Graph;
