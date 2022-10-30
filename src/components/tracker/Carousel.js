import { Box, Button, Card, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../api/coinGecko";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins("usd"));

    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const theme = useTheme();

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
      padding: "20px 0px",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
      textDecoration: "none",
      padding: "10px 40px 10px 40px",
    },
  }));

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    },
  };

  const classes = useStyles();

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Button>
        <Link className={classes.carouselItem} to={`/dashboard/tracker/${coin.id}`}>
          <img src={coin?.image} alt={coin.name} height="60" style={{ marginBottom: 10 }} />
          <span>
            {coin?.symbol}
            &nbsp;
            <span
              style={{
                color: profit > 0 ? theme.palette.success.main : theme.palette.error.main,
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>$ {numberWithCommas(coin?.current_price.toFixed(2))}</span>
        </Link>
      </Button>
    );
  });

  return (
    <>
      <div className={classes.carousel}>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          // paddingLeft="0px"
          // paddingRight="0px"
          responsive={responsive}
          items={items}
          autoPlay
        />
      </div>
    </>
  );
};

export default Carousel;
