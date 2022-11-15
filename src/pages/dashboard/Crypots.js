import { capitalCase } from "change-case";
// @mui
import { Container, Tab, Box, Tabs, Typography } from "@mui/material";
// routes
import { useWeb3React } from "@web3-react/core";
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useTabs from "../../hooks/useTabs";
import useSettings from "../../hooks/useSettings";
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from "../../_mock";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import { Create, Explore } from "../../sections/@dashboard/general/crypots";
import ConnectComponent from "../../components/connectors/ConnectComponent";

export default function Crypots() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs("explore");
  const { activate, deactivate, active, chainId, account, error, library } = useWeb3React();

  const ACCOUNT_TABS = [
    {
      value: "explore",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <Explore />,
    },
    {
      value: "create",
      icon: <Iconify icon={"ic:round-receipt"} width={20} height={20} />,
      component: <Create />,
    },
  ];

  return (
    <>
      {active === true ? (
        <Page title="Crypots">
          {/* <Typography variant="h6" sx={{ fontWeight: "bold", padding: "10px 0px", color: "red" }}>
            This feature is under development and is available to test on the Binance Smart Chain Testnet only.
          </Typography> */}
          <Container maxWidth={themeStretch ? false : "lg"}>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {ACCOUNT_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
              ))}
            </Tabs>
            <Box sx={{ mb: 5 }} />
            {ACCOUNT_TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </Container>
        </Page>
      ) : (
        <ConnectComponent />
      )}
    </>
  );
}
