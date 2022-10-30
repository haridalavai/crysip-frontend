import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { getTokenFromAddress } from "../api/moralis";
import { HistoricalChart, Search } from "../api/coinGecko";

const useCrypot = (Crypot, address) => {
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  const [crypotContract, setCrypotContract] = useState(null);

  // useEffect(() => {
  //   if (active) {
  //     const CrypotContract = new library.eth.Contract(Crypot?.abi, address);
  //     setCrypotContract(CrypotContract);
  //   }
  // }, [active]);

  const getCrypotData = async () => {
    const CrypotContract = new library.eth.Contract(Crypot.abi, address);
    const crypots = await CrypotContract.methods.getCrypotData().call();
    return crypots;
  };

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

  const calculateCagr = async (currencies) => {
    const c = await getCurrencyData(currencies, 365 * 4);
    let start = 0;
    let last = 0;
    const p = c.map((curr) => {
      start += Number(curr.prices[0][1]);
      last += Number(curr.prices[curr.prices.length - 1][1]);
      return start;
    });
    console.log(start);
    console.log(last);
    const cagr = ((last / start) ** (1 / 4) - 1) * 100;
    await Promise.all(p);
    console.log(cagr);
    return cagr;
  };

  return { crypotContract, getCrypotData, getCurrencyData, calculateCagr };
};

export default useCrypot;
