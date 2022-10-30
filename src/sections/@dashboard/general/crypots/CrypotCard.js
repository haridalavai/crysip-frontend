import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  Grid,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Typography,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

import Crypot from "../../../../abis/contracts/Crypot.sol/Crypot.json";
import DialogAnimate from "../../../../components/animate/DialogAnimate";
import { currencyList } from "./currencies";
import wbnb from "../../../../abis/wbnb/wbnb.json";
import TokensInfo from "./tokensInfo";
import { getCoinInfo } from "../../../../api/tokenApis";
import Label from "../../../../components/Label";
import CrypotAvatar from "./CrypotAvatar";
import { capitalizeFirstLetter } from "../../../../utils/formatString";
import useCrypot from "../../../../hooks/useCrypot";

const CrypotCard = ({ crypot, owned }) => {
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  const [crypotData, setCrypotData] = useState({});
  const [crypotContract, setCrypotContract] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [usdt, setUsdt] = useState(null);
  const [currencyData, setCurrencyData] = useState([]);
  const [currencyIds, setCurrencyIds] = useState([]);
  const [cagr, setCagr] = useState(0);

  const history = useNavigate();

  const theme = useTheme();
  const { getCrypotData, calculateCagr } = useCrypot(Crypot, crypot);

  // const
  const handleClose = () => {
    setIsViewOpen(false);
  };
  useEffect(async () => {
    if (active) {
      const CrypotContract = new library.eth.Contract(Crypot.abi, crypot);
      setCrypotContract(CrypotContract);
      const crypots = await CrypotContract.methods.getCrypotData().call();
      console.log(crypots);
      const c = await getCurrencyData(crypots._currencies);
      setCrypotData(crypots);
      setCurrencyIds(c);
      const cagr = await calculateCagr(crypots._currencies);
      setCagr(cagr);
    }
  }, []);

  useEffect(() => {
    getCurrencyData(crypotData._currencies);
  }, [crypotData]);

  const getCurrencyData = async (currencies) => {
    const cd = [];
    currencies?.forEach(async (currency) => {
      const res = await getCoinInfo(currency);
      cd.push(res.data);
    });

    setCurrencyData(cd);
  };

  const getTokenName = (address) => {
    currencyList.forEach((currency) => {
      console.log(address);
      console.log(currency.value === address);
      if (currency.value === address) {
        return currency;
      }
    });
  };

  const handleInvest = async () => {
    const CrypotContract = new library.eth.Contract(Crypot.abi, crypot);
    const usdt = new library.eth.Contract(wbnb.abi, "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684");
    console.log(usdt);
    setUsdt(usdt);
    const allowed = await checkAllowance(usdt, crypot, account);
    console.log(allowed === "0");

    if (allowed === "0") {
      approve();
    } else {
      invest();
    }
  };

  const approve = async () => {
    await usdt.methods
      .approve(crypot, library.utils.toWei("15000000"))
      .send({ from: account })
      .on("receipt", (hash) => {
        console.log(hash);
        if (hash.status === true) {
          // swap();
          invest();
        }
      });
  };

  const checkAllowance = async (token, spender, owner) => {
    const isAllowed = await token.methods.allowance(owner, spender).call();
    return isAllowed;
  };

  const invest = async () => {
    crypotContract.methods
      .invest(library.utils.toWei(amount))
      .send({ from: account })
      .on("receipt", async (hash) => {
        console.log("done");
      });
  };

  console.log(crypot);
  console.log(currencyData, "kdked");
  return (
    <Card sx={{ padding: "30px" }}>
      <Grid container>
        <Grid item xs={12}>
          <CrypotAvatar name={crypotData._name} />
        </Grid>
        <Grid item xs={12} sx={{ color: theme.palette.primary.main, margin: "0px 0px" }}>
          <Typography variant="h4">{capitalizeFirstLetter(crypotData._name)}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ color: theme.palette.text.primary, margin: "15px 0px" }}>
          <Typography variant="body1">{capitalizeFirstLetter(crypotData._description?.substr(0, 50))}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ color: theme.palette.text, py: "7px" }}>
          <Grid container spacing={3} sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <Button
                onClick={() => {
                  history(`/dashboard/crypots/${crypot}`);
                }}
              >
                View more
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <Button onClick={handleClose}>Cancel</Button> */}
    </Card>
  );
};

export default CrypotCard;
