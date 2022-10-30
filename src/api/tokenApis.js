import axios from 'axios';

const getCoinInfo = (address) => {
  const res = axios.get(
    `https://api.unmarshal.com/v1/tokenstore/token/address/${address}?auth_key=3wkpOlLFSy7EgTlGWl2iJ6dcSWrMYeKIaYH8nUcX`
  );
  return res;
};

export { getCoinInfo };
