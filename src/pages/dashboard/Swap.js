import { Button, Card, Grid, Box, MenuItem, TextField, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import SwapFrom from "../../sections/@dashboard/general/swap/SwapFrom";
import SwapTo from "../../sections/@dashboard/general/swap/SwapTo";
import Label from "../../components/Label";
import ConnectComponent from "../../components/connectors/ConnectComponent";
import { currencyList } from "../../constants/currencies";
import wbnb from "../../abis/wbnb/wbnb.json";
import swap from "../../abis/contracts/Swap.sol/Swap.json";
import { SWAP } from "../../abis/addressConfig";

const Swap = () => {
  const theme = useTheme();
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  const [currencyToArray, setCurrencyToArray] = useState([]);
  const [fromToken, setFromToken] = useState(currencyList[0].value);
  const [fromAmount, setFromAmount] = useState(0);
  const [fromTokenContract, setFromTokenContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(false);
  const [SwapContract, setSwapContract] = useState(null);
  const [gas, setGas] = useState(0);
  const [estimateGas, setEstimateGas] = useState(0);

  useEffect(async () => {
    // handleFromTokenChange();

    if (active) {
      const fromTokenContract = await new library.eth.Contract(wbnb.abi, fromToken);
      await setFromTokenContract(fromTokenContract);
      checkBalance();
      const gas = await library.eth.getGasPrice();
      setGas(gas);
    }
  }, [fromToken]);

  const checkBalance = async () => {
    try {
      setLoading(true);

      const balance = await fromTokenContract.methods.balanceOf(account).call();
      setBalance(library.utils.fromWei(balance));
      setLoading(false);
      console.log(balance, fromToken);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const onAddCurrency = () => {
    setCurrencyToArray([
      ...currencyToArray,
      { key: currencyToArray.length, currency: currencyList[0].value, percent: 0 },
    ]);
  };

  const setPercent = (key, value) => {
    const newObj = [];

    currencyToArray.forEach((currency) => {
      if (currency.key === key) {
        currency.percent = value;
      }
      newObj.push(currency);
    });

    setCurrencyToArray(newObj);
    console.log(currencyToArray);
  };

  const setCurrency = (key, value) => {
    const newObj = [];

    currencyToArray.forEach((currency) => {
      if (currency.key === key) {
        currency.currency = value;
      }
      newObj.push(currency);
    });

    setCurrencyToArray(newObj);
    console.log(currencyToArray);
  };

  const onSwap = async () => {
    console.log(fromToken, "fromToken");
    console.log(fromAmount, "fromAmount");

    const currArr = [];
    const disArr = [];

    currencyToArray.forEach((curr) => {
      currArr.push(curr.currency);
      disArr.push(curr.percent * 100);
    });

    console.log(currArr, "currArr");
    console.log(disArr, "disArr");

    const swapContract = new library.eth.Contract(swap.abi, swap);
    const allowed = await checkAllowance(fromTokenContract, SWAP, account);
    console.log(allowed === "0");

    if (allowed === "0") {
      approve(currArr, disArr);
    } else {
      invest(currArr, disArr);
    }
  };

  const approve = async (currArr, disArr) => {
    try {
      setLoading(true);
      await fromTokenContract.methods
        .approve(SWAP, library.utils.toWei("15000000"))
        .send({ from: account })
        .on("receipt", (hash) => {
          console.log(hash);
          if (hash.status === true) {
            // swap();
            invest(currArr, disArr);
          }
        });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const invest = async (currArr, disArr) => {
    try {
      setLoading(true);
      const swapContract = new library.eth.Contract(swap.abi, SWAP);
      const estimateGas = swapContract.methods
        .swapOneForMany(library.utils.toWei(fromAmount), fromToken, currArr, disArr)
        .estimateGas({
          from: account,
          gasPrice: gas,
        });
      setEstimateGas(estimateGas);
      swapContract.methods
        .swapOneForMany(library.utils.toWei(fromAmount), fromToken, currArr, disArr)
        .send({ from: account })
        .on("receipt", async (hash) => {
          console.log("done", hash);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const checkAllowance = async (token, spender, owner) => {
    try {
      const isAllowed = await token.methods.allowance(owner, spender).call();
      return isAllowed;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {active === true ? (
        <Box>
          {/* <Typography variant="h6" sx={{ fontWeight: "bold", padding: "10px 0px", color: "red" }}>
            This feature is under development and is available to test on the Binance Smart Chain Testnet only.
          </Typography> */}
          <Card sx={{ width: "500px", padding: "20px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SwapFrom
                  fromToken={fromToken}
                  balance={balance}
                  fromAmount={fromAmount}
                  fromTokenContract={fromTokenContract}
                  loading={loading}
                  setBalance={setBalance}
                  setFromAmount={setFromAmount}
                  setFromToken={setFromToken}
                  setFromTokenContract={setFromTokenContract}
                  setLoading={setLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <SwapTo
                  currencyToArray={currencyToArray}
                  setPercent={setPercent}
                  setCurrency={setCurrency}
                  onAddCurrency={onAddCurrency}
                />
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ padding: "20px", boxShadow: "none", border: `0.5px solid ${theme.palette.primary.main}` }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Label color="info" size="large">
                        Gas : {gas}
                      </Label>
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton loading={loading} variant="contained" size="large" fullWidth onClick={onSwap}>
                        Swap
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Box>
      ) : (
        <ConnectComponent />
      )}
    </Box>
  );
};

export default Swap;
