import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Card,
  CardHeader,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../../../../api/coinGecko";
import Scrollbar from "../../../../components/Scrollbar";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const theme = useTheme();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const useStyles = makeStyles((theme) => ({
    row: {
      cursor: "pointer",

      "&:hover": {
        backgroundColor: theme.palette.background.neutral,
      },
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  }));

  const classes = useStyles();
  const history = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList("usd"));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    return coins.filter(
      (coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "40px" }}>
      <Typography variant="h4" style={{ marginBottom: "40px" }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search For a Crypto Currency.."
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper} sx={{ minWidth: 720 }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <Card>
            <CardHeader title="Crypto Currencies" sx={{ mb: 3 }} />
            <Table sx={{ width: "100%" }}>
              {/* <Scrollbar> */}
              <TableHead sx={{ paddingTop: "10px" }}>
                <TableRow>
                  {["Coin", "Price", "24h Price Change", "24h Cap Change", "Market Cap"].map((head) => (
                    <TableCell key={head} align={head === "Coin" ? "" : "right"}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => {
                          console.log("hi");
                          history(`/dashboard/tracker/${row.id}`);
                        }}
                        key={row.name}
                        className={classes.row}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                            alignItems: "center",
                          }}
                        >
                          <img src={row?.image} alt={row.name} height="40" />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 15,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">$ {numberWithCommas(row.current_price.toFixed(2))}</TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? theme.palette.success.main : theme.palette.error.main,
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? theme.palette.success.main : theme.palette.error.main,
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.market_cap_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          $ {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              {/* </Scrollbar> */}
            </Table>
          </Card>
        )}
      </TableContainer>

      {/* Comes from @material-ui/lab */}
      <Pagination
        count={(handleSearch()?.length / 10).toFixed(0)}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};

export default CoinsTable;
