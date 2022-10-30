import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// utils
import { useWeb3React } from "@web3-react/core";
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";
import { CRYPOT_MANAGER } from "../abis/addressConfig";
import CrypotManager from "../abis/contracts/CrypotManager.sol/CrypotManager.json";
import Crypot from "../abis/contracts/Crypot.sol/Crypot.json";
import { HistoricalChart } from "../api/coinGecko";

// ----------------------------------------------------------------------

const CrypotContext = createContext();

// ----------------------------------------------------------------------

CrypotProvider.propTypes = {
  children: PropTypes.node,
};

function CrypotProvider({ children }) {
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  const [crypots, setCrypots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (active) {
        const CrypotManagerContract = new library.eth.Contract(CrypotManager.abi, CRYPOT_MANAGER);
        const crypots = await CrypotManagerContract.methods.getCrypots().call();
        console.log(crypots);
        setCrypots(crypots);
      }
    };
    fetchData();
  }, [active]);

  return <CrypotContext.Provider value={{ crypots }}>{children}</CrypotContext.Provider>;
}

export { CrypotContext, CrypotProvider };
