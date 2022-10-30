import React, { useState, useContext } from 'react';
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useWeb3React } from '@web3-react/core';
import { currencyList } from './currencies';
import DistributionSlider from './DistributionSlider';
import { CRYPOT_MANAGER } from '../../../../abis/addressConfig';
import CrypotManager from '../../../../abis/contracts/CrypotManager.sol/CrypotManager.json';
import Crypot from '../../../../abis/contracts/Crypot.sol/Crypot.json';
import CreateForm from './CreateForm';
import { CrypotContext } from '../../../../contexts/Crypots';
import YCrypotCard from './YCrypotCard';

const Create = () => {
  const [open, setOpen] = React.useState(false);
  const crypotContext = useContext(CrypotContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item sx={{ alignItems: 'right' }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Create
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create your Crypot</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '15px 15px 0 15px' }}
        >
          <CreateForm />
        </DialogContent>
      </Dialog>

      <Grid item sm={12}>
        Your crypots
      </Grid>

      {crypotContext.crypots.map((crypot) => (
        <Grid item sm={6}>
          <YCrypotCard crypot={crypot} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Create;
