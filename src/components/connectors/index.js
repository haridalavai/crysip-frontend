import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { useWeb3React } from '@web3-react/core';
import { CoinbaseWallet, WalletConnect, Injected } from './connectorsConfig';

const Connectors = () => {
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Connect
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Connect to a wallet</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '15px 15px 0 15px' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: '150px',
            }}
          >
            <LoadingButton
              variant="outlined"
              onClick={() => {
                activate(Injected);
              }}
            >
              Metamask
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={() => {
                activate(WalletConnect);
              }}
            >
              Wallet Connect
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                activate(CoinbaseWallet);
              }}
            >
              Coinbase
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Connectors;
