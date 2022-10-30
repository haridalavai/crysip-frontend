import axios from "axios";

const MORALIS_API_KEY = "MKjwKoxsfdLNJqLoySY1BOCVXj5vfZRXIjB5C9DDc3zqEVbPIoL5IBJpM6QrEvwT";
export const getTokenFromAddress = async (chain, address) => {
  const { data } = await axios.get(
    `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=${chain}&addresses=${address}`,
    {
      headers: {
        "X-API-Key": MORALIS_API_KEY,
      },
    }
  );

  return data;
};
