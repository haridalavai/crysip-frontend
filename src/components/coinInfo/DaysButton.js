import { Button } from "@mui/material";
import React from "react";

const DaysButton = ({ selected, days, setDays, content }) => {
  return (
    <Button variant={selected ? "outlined" : ""} onClick={() => setDays(days)}>
      {content}
    </Button>
  );
};

export default DaysButton;
