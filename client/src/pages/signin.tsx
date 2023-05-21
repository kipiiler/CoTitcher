import {
  Button,
  Checkbox,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Logo from "../static/logo.svg";
// import { authServer } from "../../config/apiUrl.json";

// import { useHistory } from "react-router-dom";

import Login from "../static/login.svg";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";
import { useRouter } from "next/router";

interface Itoken {
  access_token: string;
  refresh_token: string;
}

function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  function login() {
    if (input.email === "hoangng@uw.edu" && input.password === "123456") {
      router.push("/dashboard");
    }
    // axios
    //   .post<Itoken>(authServer + "/token", input)
    //   .then((res) => {
    //     localStorage.setItem("access_token", res.data.access_token);
    //     router.go(0);
    //     router.push("/dashboard");
    //   })
    //   .catch((e) => console.log(e));
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      style={{ width: "100%", height: "100vh" }}
    >
      <Grid item xs={5}>
        <Grid
          container
          direction="column"
          spacing={2}
          style={{ marginLeft: "10vw", margin: 80, maxWidth: "700px" }}
        >
          <Grid container alignItems={"center"}>
            <Grid item>
              <Image
                alt="coteach logo"
                src={Logo}
                width={80}
                height={80}
              ></Image>
            </Grid>
            <Grid item>
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
          <Grid item style={{ marginTop: 120 }}>
            <Typography
              align="left"
              variant="h2"
              style={{ fontSize: 30, fontWeight: 700, marginBottom: 24 }}
            >
              Sign in
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="left">Email</Typography>
          </Grid>
          <Grid item>
            <TextField
              name="email"
              variant="standard"
              value={input.email}
              onChange={(e) => {
                handleInputChange(e);
              }}
              style={{ width: "100%" }}
              placeholder="Email"
            ></TextField>
          </Grid>
          <Grid item>
            <Typography align="left">Password</Typography>
          </Grid>
          <Grid item>
            <TextField
              name="password"
              type="password"
              value={input.password}
              variant="standard"
              onChange={(e) => {
                handleInputChange(e);
              }}
              style={{ width: "100%" }}
              placeholder="Password"
            ></TextField>
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container justifyContent="center" alignItems="center">
                  <Checkbox></Checkbox>
                  <Typography>Remember me</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography style={{ color: "#425D50" }}>
                  Forgot password?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            style={{ marginBottom: 24 }}
          >
            <Button
              onClick={() => {
                login();
              }}
              // fullWidth
              variant="contained"
              style={{ padding: "10x 80px" }}
            >
              <Typography>Login now</Typography>
            </Button>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Button variant="contained" startIcon={<GoogleIcon />}>
              <Typography>Login with Google</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Typography display="inline">
              Don&apos;t have an account{" "}
            </Typography>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <Typography display="inline" style={{ color: "#0052B" }}>
                Join free today
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} style={{ height: "100%", position: "relative" }}>
        <Image src={Login} alt={""} fill></Image>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
