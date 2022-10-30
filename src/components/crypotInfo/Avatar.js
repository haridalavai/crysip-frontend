import { Box, Typography } from "@mui/material";
import React from "react";
import { capitalizeFirstLetter } from "../../utils/formatString";

const Avatar = ({ name = "" }) => {
  console.log(name);

  const colors = ["#d82f44", "#668bdd"];

  return (
    <Box
      sx={{
        width: "100px",
        height: "100px",
        backgroundColor: colors[Math.round(Math.random())],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // margin: "10px",
        borderRadius: "5px",
      }}
    >
      <Typography variant="body2" sx={{ fontSize: "50px" }}>
        {capitalizeFirstLetter(name[0])}
      </Typography>
    </Box>
  );
};

export default Avatar;
