import React from "react";
import Student from "../data/student.json";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
// import Student from "../data/student.json";

function Tracker() {
  return (
    <>
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
            Student list
          </Typography>
        </Grid>
        {Student.map((e, i) => {
          return (
            <Grid item xs={12} key={i}>
              <Link
                href={"/tracker/" + e.studentID}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Grid container style={{ marginTop: 24 }}>
                  <Grid item xs={1}>
                    <Image
                      alt=""
                      width={65}
                      height={40}
                      src="https://www.pngkey.com/png/detail/532-5327322_contact-us-human-icon-png.png"
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container>
                      <Typography>
                        {e.firstName} &nbsp; {e.lastName}
                      </Typography>
                      <Typography style={{ paddingLeft: 24 }}>
                        {e.studentID}
                      </Typography>
                    </Grid>
                    <Typography>{e.student_description}</Typography>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Tracker;
