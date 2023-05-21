import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";

function DashBoard() {
  return (
    <Grid container style={{ padding: "100px 80px 0px 80px" }}>
      <Grid item xs={12}>
        <Typography
          align="center"
          style={{
            marginTop: 48,
            marginBottom: 64,
            width: "100%",
            fontWeight: 700,
            fontSize: 35,
          }}
        >
          Quiz Generator
        </Typography>
      </Grid>
      <Grid container spacing={20}>
        <Grid item xs={4}>
          <Grid container style={{ marginBottom: 64 }}>
            <Grid item xs={12}>
              <Typography>Quiz Scope</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField style={{ width: "100%" }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12}>
              <Typography style={{ width: "100%" }}>
                Difficulty Level
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField select style={{ width: "100%" }}>
                <MenuItem value={"Easy"}>Easy</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Hard"}>Hard</MenuItem>
                <MenuItem value={"College Level"}>College Level</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12}>
              <Typography style={{ width: "100%" }}>Class Data</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField select style={{ width: "100%" }}>
                <MenuItem value={"CSE331 Sp23"}>CSE331 Sp23</MenuItem>
                <MenuItem value={"ECON200"}>ECON200</MenuItem>
                <MenuItem value={"PHYS121"}>PHYS121</MenuItem>
                <MenuItem value={"Class C"}>Class C</MenuItem>
                <MenuItem value={"SPEC80T"}>SPEC80T</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12}>
          <Typography style={{ width: "100%" }}>
            Any other requirement? (try to be more detailed)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField style={{ width: "100%" }} multiline rows={7} />
        </Grid>
        <Grid item style={{ marginTop: 24 }}>
          <Button variant="contained">
            <Typography>Generate Quiz</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DashBoard;
