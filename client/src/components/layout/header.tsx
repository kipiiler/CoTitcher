import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import Logo from "../../static/logo.svg";
import Image from "next/image";

const menuItems = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/about",
  },
];

const useStyles = makeStyles((theme: any) => ({
  appBar: {
    zIndex: 1,
    width: "100%",
    height: "10%",
    background: "",
  },
  menuLink: {
    marginRight: 2,
    color: "black",
    fontSize: 16,
    fontWeight: 400,
    textDecoration: "none",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Grid
          container
          justifyContent={"space-between"}
          className={classes.appBar}
        >
          <Grid item>
            <Grid container alignItems={"center"}>
              <Grid item>
                <Grid container alignItems={"center"}>
                  <Image
                    alt="co-teach logo"
                    src={Logo}
                    width={80}
                    height={80}
                  ></Image>
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
                      fontSize: 40,
                      fontWeight: 800,
                    }}
                  >
                    Co-Teach
                  </Typography>
                </Grid>
              </Grid>
              <Grid item style={{ marginLeft: 64 }}>
                <Grid container>
                  {menuItems.map((item, i) => (
                    <Link
                      href={item.url}
                      key={i}
                      style={{
                        textDecoration: "none",
                        paddingLeft: 16,
                        color: "black",
                      }}
                    >
                      <Typography className={classes.menuLink}>
                        {item.label}
                      </Typography>
                    </Link>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems={"center"} style={{ height: "100%" }}>
              <Grid item>
                <Link
                  href={"/signin"}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Typography className={classes.menuLink}>Sign in</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Button variant="contained" style={{ margin: 16 }}>
                  <Link href="/signup">
                    <Typography
                      className={classes.menuLink}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Sign up
                    </Typography>
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
