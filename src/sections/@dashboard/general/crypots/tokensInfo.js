import { AvatarGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCoinInfo } from '../../../../api/tokenApis';

const TokensInfo = ({ currencies }) => {
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    getCurrencyData();
  }, []);

  const getCurrencyData = async () => {
    currencies?.forEach(async (currency) => {
      const res = await getCoinInfo(currency);
      console.log(res, 'cur');
    });
  };

  return (
    <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
      hi
    </AvatarGroup>
  );
};

export default TokensInfo;
