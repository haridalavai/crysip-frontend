import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { useWeb3React } from "@web3-react/core";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableHead from "@mui/material/TableHead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { getTransactions } from "../../../../api/walletApis";
import Scrollbar from "../../../../components/Scrollbar";
import Label from "../../../../components/Label";

// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {/* <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton> */}
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <FontAwesomeIcon icon={faCaretRight} /> : <FontAwesomeIcon icon={faCaretLeft} />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <FontAwesomeIcon icon={faCaretLeft} /> : <FontAwesomeIcon icon={faCaretRight} />}
      </IconButton>
      {/* <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton> */}
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function TransactionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const { library } = useWeb3React();
  const theme = useTheme();

  const isLight = theme.palette.mode === "light";

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  useEffect(() => {
    gettrans();
  }, []);

  useEffect(() => {
    gettrans();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createData = async (txnData) => {
    const txns = [];

    await txnData.forEach((txn) => {
      const d = new Date(txn.date);

      const t = {
        id: txn.id,
        to: txn.to,
        from: txn.from,
        date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear() + 52}`,
        type: txn.type,
        fee: library.utils.fromWei(txn.fee.toString()),
        description: txn.description,
        status: txn.status,
      };
      txns.push(t);
    });
    setRows(txns);
    return txns;
  };

  const gettrans = async () => {
    const data = await getTransactions(
      "bsc-testnet",
      "0x3302B070B64435F3CDb0C2b3a6978d73E7701969",
      1,
      5,
      "rZdM2XGmkm6MFQ2KZ1SYR1OdMefYhUnYQ0EPxmT9"
    );

    const rows = await createData(data.transactions);
    setRows(rows);
  };

  return (
    <>
      <Card>
        <CardHeader title="Recent Transitions" sx={{ mb: 3 }} />
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <Scrollbar>
              <TableHead>
                <TableRow>
                  <TableCell>TXN ID</TableCell>
                  <TableCell>to/from</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Fee</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.to}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.fee}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        <Label
                          variant={isLight ? "ghost" : "filled"}
                          color={
                            (row.status === "completed" && "success") ||
                            (row.status === "pending" && "warning") ||
                            "error"
                          }
                        >
                          {row.status}
                        </Label>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Scrollbar>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            sx={{ width: "100%", display: "flex" }}
            colSpan={12}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableContainer>
      </Card>
    </>
    // <Paper>
    //   <TableContainer component={Paper}>
    //     <Table sx={{ minWidth: 500, padding: '10px' }} aria-label="custom pagination table">
    //       <TableHead sx={{ padding: '10px' }}>
    //         <TableRow sx={{ padding: '10px' }}>
    //           <TableCell>TXN ID</TableCell>
    //           <TableCell>to/from</TableCell>
    //           <TableCell>Date</TableCell>
    //           <TableCell>Type</TableCell>
    //           <TableCell>Fee</TableCell>
    //           <TableCell>Description</TableCell>
    //           <TableCell>Status</TableCell>
    //           <TableCell />
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {rows.map((row) => {
    //           return (
    //             <TableRow key={row.id}>
    //               <TableCell>{row.id}</TableCell>
    //               <TableCell>{row.to}</TableCell>
    //               <TableCell>{row.date}</TableCell>
    //               <TableCell>{row.type}</TableCell>
    //               <TableCell>{row.fee}</TableCell>
    //               <TableCell>{row.description}</TableCell>
    //               <TableCell>{row.status}</TableCell>
    //             </TableRow>
    //           );
    //         })}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // <TablePagination
    //   rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
    //   //   colSpan={3}
    //   count={rows.length}
    //   rowsPerPage={rowsPerPage}
    //   page={page}
    //   SelectProps={{
    //     inputProps: {
    //       'aria-label': 'rows per page',
    //     },
    //     native: true,
    //   }}
    //   onPageChange={handleChangePage}
    //   onRowsPerPageChange={handleChangeRowsPerPage}
    //   ActionsComponent={TablePaginationActions}
    // />
    // </Paper>
  );
}
