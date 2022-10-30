import { useState, useContext } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Box, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
// hooks
import { useWeb3React } from '@web3-react/core';
import { CrypotContext } from '../../contexts/Crypots';

import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';

// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
import Connectors from '../../components/connectors';
import ConnectComponent from '../../components/connectors/ConnectComponent';
import TransactionsTable from '../../sections/@dashboard/general/app/Transactions';
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();
  const [age, setAge] = useState('');
  const crypotContext = useContext(CrypotContext);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  console.log(crypotContext);
  return (
    <>
      {active === true ? (
        <Page title="Dashboard">
          <Container maxWidth={themeStretch ? false : 'xl'}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={2}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Chain</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>BSC</MenuItem>
                      <MenuItem value={20}>Polygon</MenuItem>
                      <MenuItem value={30}>Ethereum</MenuItem>
                      <MenuItem value={30}>Solana</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {/* <AppWelcome displayName={user?.displayName} /> */}
              </Grid>

              <Grid item xs={12} md={4} />

              <Grid item xs={12} lg={8}>
                {/* <AppNewInvoice /> */}
                <TransactionsTable />
              </Grid>
            </Grid>
          </Container>
        </Page>
      ) : (
        <ConnectComponent />
      )}
    </>
  );
}
