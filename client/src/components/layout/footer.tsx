import React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Logo from "../../static/logo.svg";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "",
    color: "white",
    padding: 16,
  },
  footerLink: {
    width: "100%",
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.footer}>
      <Container
        style={{
          marginTop: 40,
          paddingTop: 40,
          borderTop: "2px solid #2A407C",
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Grid container alignItems={"center"}>
              <Image
                alt="co-teach logo"
                src={Logo}
                width={40}
                height={40}
              ></Image>
              <Typography
                variant="h6"
                style={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#8794BA",
                }}
              >
                Co-Teach
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              style={{ color: "#8794BA" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              style={{ color: "#8794BA" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              aliquam sodales sem, id consectetur ante ultricies non.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              style={{ color: "#8794BA" }}
            >
              Contact Info
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              style={{ color: "#8794BA" }}
            >
              Address: 123 Street, City, Country
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              style={{ color: "#8794BA" }}
            >
              Phone: +1 123-456-7890
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              style={{ color: "#8794BA" }}
            >
              Email: info@example.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              style={{ color: "#8794BA" }}
            >
              Follow Us
            </Typography>
            <Grid container>
              <Link
                href="#"
                className={classes.footerLink}
                style={{ textDecoration: "none", color: "#8794BA" }}
              >
                <Typography variant="body2" gutterBottom>
                  Facebook
                </Typography>
              </Link>
            </Grid>
            <Grid container>
              <Link
                href="#"
                className={classes.footerLink}
                style={{ textDecoration: "none", color: "#8794BA" }}
              >
                <Typography variant="body2" gutterBottom>
                  Twitter
                </Typography>
              </Link>
            </Grid>
            <Grid container>
              <Link
                href="#"
                className={classes.footerLink}
                style={{ textDecoration: "none", color: "#8794BA" }}
              >
                <Typography variant="body2" gutterBottom>
                  Instagram
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Footer;
