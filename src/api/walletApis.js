import axios from 'axios';

export const getTransactions = async (chain, address, page, pageSize, apiKey) => {
  const res = await axios.get(
    `https://api.unmarshal.com/v2/${chain}/address/${address}/transactions?page=${page}&pageSize=${pageSize}&auth_key=${apiKey}`
  );

  return res.data
};
