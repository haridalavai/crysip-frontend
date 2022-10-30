import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
  appName: 'Web3-react Demo',
  supportedChainIds: [1, 3, 4, 5, 42, 97, 56],
});

const WalletConnect = new WalletConnectConnector({
  rpcUrl: `https://data-seed-prebsc-1-s1.binance.org:8545`,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 97, 56],
});

export { CoinbaseWallet, WalletConnect, Injected };
