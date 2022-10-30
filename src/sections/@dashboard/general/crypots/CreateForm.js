import React, { useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useWeb3React } from "@web3-react/core";
import { currencyList } from "./currencies";
import DistributionSlider from "./DistributionSlider";
import { CRYPOT_MANAGER } from "../../../../abis/addressConfig";
import CrypotManager from "../../../../abis/contracts/CrypotManager.sol/CrypotManager.json";
import Crypot from "../../../../abis/contracts/Crypot.sol/Crypot.json";

const CreateForm = ({ setOpen }) => {
  const [currencies, setCurrencies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();

  const changePercentage = (name, percent) => {
    const newObj = [];

    currencies.forEach((currency) => {
      if (currency.name === name) {
        currency.percent = percent;
      }
      newObj.push(currency);
    });

    setCurrencies(newObj);
  };

  const onSubmit = async () => {
    const currArr = [];
    const disArr = [];

    currencies.forEach((currency) => {
      currArr.push(currency.value);
      disArr.push(currency.percent * 100);
    });
    if (active) {
      setLoading(true);
      const CrypotManagerContract = new library.eth.Contract(CrypotManager.abi, CRYPOT_MANAGER);
      const crypots = await CrypotManagerContract.methods
        .createCrypot(title, description, currArr, disArr)
        .send({ from: account })
        .on("receipt", () => {
          setLoading(false);
        });
      console.log(crypots);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Grid>
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
          <Grid item sm={12} md={6}>
            <DistributionSlider currency={currency} changePercentage={changePercentage} />
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <DialogActions>
          <Button>Cancel</Button>
          <Button variant="contained" onClick={onSubmit}>
            create
          </Button>
        </DialogActions>
      </Grid>
    </Grid>
  );
};

export default CreateForm;
