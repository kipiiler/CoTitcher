import { Grid, Typography } from "@mui/material";
import React from "react";
import Logo from "../../static/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Quiz from "../../static/quizMenu.svg";
import Lession from "../../static/lessonMenu.svg";
import Tracker from "../../static/trackerMenu.svg";
import { useRouter } from "next/router";

const menuItems = [
  {
    label: "Lesson Planner",
    icon: Lession,
    url: "/lesson",
  },
  {
    label: "Quiz Generator",
    icon: Quiz,
    url: "/quiz",
  },
  {
    label: "Student Progress Tracker",
    icon: Tracker,
    url: "/tracker",
  },
];

function DashBoardHeader() {
  const router = useRouter();

  return (
    <>
      <Grid
        container
        style={{
          position: "fixed",
          maxWidth: 400,
          width: 400,
          height: "100vh",
          background: "#222222",
        }}
        alignContent={"space-between"}
      >
        <Grid item style={{ marginTop: 80 }}>
          <Grid container alignItems={"center"}>
            <Image
              alt="co-teach logo"
              src={Logo}
              width={80}
              height={80}
            ></Image>
            <Link
              href={"/dashboard"}
              style={{
                textDecoration: "none",
                paddingLeft: 16,
                color: "white",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
                  fontSize: 40,
                  fontWeight: 800,
                  color: "white",
                }}
              >
                Co-Teach
              </Typography>
            </Link>
          </Grid>
          <Grid container direction={"column"}>
            <Grid item>
              <Grid container>
                {menuItems.map((item, i) => {
                  return (
                    <Grid
                      container
                      key={i}
                      style={{
                        background:
                          router.pathname === item.url ? "#414141" : "",
                        padding: 10,
                        marginTop: 20,
                        paddingLeft: 20,
                      }}
                      alignItems={"center"}
                    >
                      <Image src={item.icon} alt={""}></Image>
                      <Link
                        href={item.url}
                        key={i}
                        style={{
                          textDecoration: "none",
                          paddingLeft: 16,
                          color: "white",
                        }}
                      >
                        <Typography>{item.label}</Typography>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item style={{ padding: 20 }}>
          <Typography style={{ color: "white" }}>
            Welcome back, Hoang
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default DashBoardHeader;
