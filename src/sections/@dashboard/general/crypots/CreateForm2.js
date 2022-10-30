import {
  TextField,
  Card,
  Grid,
  Select,
  OutlinedInput,
  Box,
  Chip,
  Autocomplete,
  InputLabel,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { currencyList } from './currencies';
import { CRYPOT_MANAGER } from '../../../../abis/addressConfig';

import CrypotManager from '../../../../abis/contracts/CrypotManager.sol/CrypotManager.json';
import Crypot from '../../../../abis/contracts/Crypot.sol/Crypot.json';

const CreateForm = () => {
  const [currencies, setCurrencies] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();

  const handleCreateClick = async () => {
    if (active) {
      setLoading(true);
      const CrypotManagerContract = new library.eth.Contract(CrypotManager.abi, CRYPOT_MANAGER);
      const crypots = await CrypotManagerContract.methods
        .createCrypot(title, description, currencies)
        .send({ from: account })
        .on('receipt', () => {
          setLoading(false);
        });
      console.log(crypots);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Title"
            sx={{ pb: '15px' }}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Autocomplete
            multiple
            id="tags-filled"
            options={currencyList.map((option) => option.name)}
            onChange={(event, newValue) => {
              const addresses = [];
              newValue.forEach((cur) => {
                const { value } = currencyList.find((obj) => {
                  return obj.name === cur;
                });

                addresses.push(value);
              });
              setCurrencies(addresses);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => <Chip variant="filled" label={option} {...getTagProps({ index })} />)
            }
            renderInput={(params) => <TextField {...params} label="Currencies" placeholder="Currencies" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            sx={{ width: '100%' }}
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <LoadingButton loading={loading} variant="contained" onClick={handleCreateClick}>
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CreateForm;
