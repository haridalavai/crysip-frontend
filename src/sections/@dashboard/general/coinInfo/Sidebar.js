import { Card, Link, Grid, Typography, Stack, Table, TableBody, TableCell } from "@mui/material";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import SocialsButton from "../../../../components/SocialsButton";

import Image from "../../../../components/Image";
import Label from "../../../../components/Label";

const Sidebar = ({ coin }) => {
  let hi;
  return (
    <Card sx={{ width: "100%", padding: "20px" }}>
      <Grid container spacing={1} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Grid item xs={12}>
          <Image src={coin?.image.large} alt={coin.name} sx={{ width: "100px" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">{coin.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Link href={coin.links.homepage[0]}>{coin.links.homepage[0]}</Link>
        </Grid>
        <Grid item xs={12}>
          <Stack alignItems="center">
            <SocialsButton initialColor />
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around" }}
        >
          <Label color="info" sx={{ padding: "2px", margin: "2px" }}>
            Rank: {coin.market_cap_rank}
          </Label>
          <Label color="info" sx={{ padding: "2px", margin: "2px" }}>
            Market Cap: ${coin?.market_data.market_cap.usd}
          </Label>
          <Label color="info" sx={{ padding: "2px", margin: "2px" }}>
            Current Price: ${coin?.market_data.current_price.usd}
          </Label>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ paddingTop: "10px" }} variant="body1">
            {ReactHtmlParser(coin.description.en.split(". ")[0])}.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Sidebar;
