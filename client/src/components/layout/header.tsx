import { Grid } from "@mui/material";
import React from "react";

const headerLink = [
  {
    content: "about",
    link: "/about",
  },
  {
    content: "signin",
    link: "/signin",
  },
  {
    content: "signup",
    link: "/signup",
  },
];

export default function Header() {
  return (
    <>
      <Grid container>
        {headerLink.map((e, i) => {
          return <Grid item></Grid>;
        })}
      </Grid>
    </>
  );
}
