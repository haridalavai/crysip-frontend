import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/styles";
import wbnb from "../../../../abis/wbnb/wbnb.json";
import Crypot from "../../../../abis/contracts/Crypot.sol/Crypot.json";

const Invest = ({ id }) => {
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  const [usdt, setUsdt] = useState(null);
  const [crypotContract, setCrypotContract] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setLoading(false);
    if (active) {
      const CrypotContract = new library.eth.Contract(Crypot.abi, id);
      setCrypotContract(CrypotContract);
      const usdt = new library.eth.Contract(wbnb.abi, "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684");
      console.log(usdt);
      setUsdt(usdt);
    }
  }, [active]);

  const handleInvest = async () => {
    setLoading(true);

    const allowed = await checkAllowance(usdt, id, account);
    console.log(allowed === "0");

    if (allowed === "0") {
      approve();
    } else {
      invest();
    }
  };

  const approve = async () => {
    await usdt.methods
      .approve(id, library.utils.toWei("15000000"))
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
    const isAllowed = await usdt.methods.allowance(owner, spender).call();
    return isAllowed;
  };

  const invest = async () => {
    crypotContract.methods
      .invest(library.utils.toWei(amount))
      .send({ from: account })
      .on("receipt", async (hash) => {
        console.log("done");
        setLoading(false);
      });
  };
  return (
    <Card sx={{ padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ padding: "5px 0px" }}>
            <Typography
              sx={{
                padding: "0px 0px 5px 0px",
                fontSize: "19px",
                fontWeight: "light",
                color: theme.palette.text.secondary,
              }}
              variant="body1"
            >
              Minimum Investmemt Amount
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.main, fontSize: "20px" }}>
              1 USDT
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton loading={loading} variant="contained" size="large" fullWidth onClick={handleInvest}>
            Invest
          </LoadingButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Invest;
