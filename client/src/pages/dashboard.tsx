import React from "react";
import DashBoardd from "../static/dashboard.svg";
import { Grid } from "@mui/material";
import Image from "next/image";
function DashBoard() {
  return (
    <>
      <Grid
        container
        style={{ position: "relative", width: "100%", height: "100vh" }}
      >
        <Image fill src={DashBoardd} alt="" />
      </Grid>
    </>
  );
}

export default DashBoard;
