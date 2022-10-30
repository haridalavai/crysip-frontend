import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import {
  Button,
  Card,
  Grid,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Chip,
  Dialog,
  DialogActions,
  Autocomplete,
  Typography,
  AvatarGroup,
  IconButton,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme, styled } from "@mui/material/styles";

import Crypot from "../../../../abis/contracts/Crypot.sol/Crypot.json";
import DialogAnimate from "../../../../components/animate/DialogAnimate";
import { currencyList } from "./currencies";
import wbnb from "../../../../abis/wbnb/wbnb.json";
import Iconify from "../../../../components/Iconify";
import TokensInfo from "./tokensInfo";
import { getCoinInfo } from "../../../../api/tokenApis";
import DistributionSlider from "./DistributionSlider";

const YCrypotCard = ({ crypot, owned }) => {
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  const [crypotData, setCrypotData] = useState({});
  const [crypotContract, setCrypotContract] = useState(null);
  const [amount, setAmount] = useState("");
  const [usdt, setUsdt] = useState(null);
  const [currencyData, setCurrencyData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setLoading(false);
    setCurrencies([]);
  };
  const changePercentage = (name, percent) => {
    const newObj = [];

    currencies.forEach((currency) => {
      if (currency.name === name) {
        currency.percent = percent;
      } else {
        currency.percent = (100 - percent) / (currencies.length - 1);
      }
      newObj.push(currency);
    });

    setCurrencies(newObj);
  };

  useEffect(async () => {
    if (active) {
      const CrypotContract = new library.eth.Contract(Crypot.abi, crypot);
      setCrypotContract(CrypotContract);
      const crypots = await CrypotContract.methods.getCrypotData().call();
      console.log(crypots);

      setCrypotData(crypots);
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

  const onSubmit = async () => {
    setLoading(true);
    const currArr = [];
    const disArr = [];

    currencies.forEach((currency) => {
      currArr.push(currency.value);
      disArr.push(currency.percent * 100);
    });
    console.log(currArr, "curr");
    console.log(disArr, "dos");
    if (active) {
      const res = await crypotContract.methods
        .changeDistribution(currArr, disArr)
        .send({ from: account })
        .on("receipt", () => {
          setLoading(false);
        });
    }
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
    <Card sx={{ padding: "20px" }}>
      <Grid container>
        <Grid item xs={11} sx={{ color: theme.palette.primary.main }}>
          <Typography variant="h4">{crypotData._name}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleEditOpen} sx={{ color: theme.palette.warning.main }}>
            <Iconify icon={"eva:edit-fill"} />
          </IconButton>
        </Grid>
        <Grid item xs={12} sx={{ color: theme.palette.text }}>
          <Typography sx={{ fontSize: "20px" }}>{crypotData._description?.substr(0, 100)}</Typography>
        </Grid>

        <Grid item xs={12} sx={{ color: theme.palette.text, py: "7px" }}>
          <Typography variant="h6">1 USDT</Typography>
        </Grid>
        <Grid item sm={12}>
          <AvatarGroup max={5} sx={{ "& .MuiAvatar-root": { width: 32, height: 32 }, textAlign: "center" }}>
            {currencyData?.map((currency) => (
              <Avatar key={currency.name} alt={currency.name} src={currency.image} />
            ))}
          </AvatarGroup>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item sm={10}>
              <TextField
                size="small"
                fullWidth
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Grid>
            <Grid item sm={2}>
              <Button variant="outlined" onClick={handleInvest}>
                Invest
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Currency distribution</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: "15px 15px 0 15px",
            }}
          >
            <Grid container spacing={3}>
              <Grid item sm={12} sx={{ textAlign: "right" }}>
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={currencyList.map((option) => option.name)}
                  onChange={(event, newValue) => {
                    const newCurrencies = [];
                    console.log(newValue);

                    const addresses = [];
                    newValue.forEach((cur) => {
                      const value = currencyList.find((obj) => {
                        return obj.name === cur;
                      });

                      addresses.push(value);
                    });

                    for (let i = 0; i < currencies.length; i += 1) {
                      for (let j = 0; j < addresses.length; j += 1) {
                        console.log(currencies[i].name);
                        console.log(addresses[j].name);
                        if (currencies[i].name === addresses[j].name) {
                          addresses.splice(j, 1);
                        }
                      }
                    }
                    newCurrencies.push(...currencies, ...addresses);
                    console.log(newCurrencies);
                    setCurrencies(newCurrencies);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => <Chip variant="filled" label={option} {...getTagProps({ index })} />)
                  }
                  renderInput={(params) => <TextField {...params} label="Currencies" placeholder="Currencies" />}
                />
              </Grid>
              {currencies.map((currency) => {
                return (
                  <Grid item xs={12} sm={12} md={6}>
                    <DistributionSlider currency={currency} changePercentage={changePercentage} />
                  </Grid>
                );
              })}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            {/* <LoadingButton variant="contained" onClick={onSubmit}>create</LoadingButton> */}
            <LoadingButton loading={loading} variant="contained" onClick={onSubmit}>
              create
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Grid>

      {/* <Button onClick={handleClose}>Cancel</Button> */}
    </Card>
  );
};

export default YCrypotCard;
