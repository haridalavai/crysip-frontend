import { Box, Typography } from "@mui/material";
import React from "react";
import { capitalizeFirstLetter } from "../../../../utils/formatString";

const CrypotAvatar = ({ name = "" }) => {
  const colors = ["#d82f44", "#668bdd"];
  return (
    <Box
      sx={{
        width: "50px",
        height: "50px",
        backgroundColor: colors[Math.round(Math.random())],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0px 0px 20px 0px",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h3">{capitalizeFirstLetter(name[0])}</Typography>
    </Box>
  );
};

export default CrypotAvatar;
