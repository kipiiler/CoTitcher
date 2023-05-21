import RootLayout from "@/components/layout/layout";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import Hero from "../static/hero.svg";
import Image from "next/image";
import Lesson from "../static/lesson.svg";
import Quiz from "../static/quiz.svg";
import Tracker from "../static/tracker.svg";
import Link from "next/link";

const features = [
  {
    imageSrc: Lesson,
    title: "Lesson Planner",
    content:
      "Streamline your class preparation process with our AI-powered tools, enabling you to create engaging lesson plans with ease.",
  },
  {
    imageSrc: Quiz,
    title: "Quiz Generator",
    content:
      "Craft interactive quizzes that enhance students' learning experience, all with the help of our intelligent quiz generation feature.",
  },
  ,
  {
    imageSrc: Tracker,
    title: "Student Progress Tracker",
    content:
      "Gain valuable insights into your students' learning journey and easily monitor their progress over time, empowering you to provide personalized guidance and support.",
  },
];

function HomePage() {
  return (
    <Grid container>
      <Grid container>
        <Typography
          style={{
            fontSize: 72,
            width: "100%",
            fontWeight: 700,
            marginTop: 150,
          }}
          align="center"
        >
          It’s Time to Meet Your {"    "}
        </Typography>
        <Typography
          style={{
            fontSize: 72,
            width: "100%",
            fontWeight: 700,
            marginBottom: 50,
          }}
          align="center"
        >
          Co-Teacher!
        </Typography>
      </Grid>

      <Grid container>
        <Typography
          style={{
            fontSize: 18,
            width: "100%",
            marginBottom: 50,
            color: "#8794BA",
          }}
          align="center"
        >
          Elevate Your Teaching Experience with AI-Powered Education!
        </Typography>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Grid item>
          <Button
            variant="contained"
            style={{ padding: "10px 80px 10px 80px", marginBottom: 60 }}
          >
            <Link
              href="/signup"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography>Try for free</Typography>
            </Link>
          </Button>
        </Grid>
      </Grid>

      {/* Hero section */}
      <Grid
        container
        style={{
          position: "relative",
          height: 700,
          width: "100%",
          borderRadius: "100px",
          overflow: "hidden",
          boxShadow: "4px 7px 14px 0px #0000000D",
        }}
      >
        <Image src={Hero} fill alt="hero-image" />
      </Grid>

      {/* Main feature section */}
      <Grid container direction={"row"} style={{ marginTop: 120 }}>
        <Grid container>
          <Typography
            align="center"
            style={{
              fontSize: 40,
              width: "100%",
              fontWeight: 800,
              marginBottom: 80,
            }}
          >
            Main Features
          </Typography>
        </Grid>
        {features.map((e, i) => {
          return (
            <Grid item xs={4} key={i}>
              <Grid
                container
                style={{ padding: 8 }}
                alignItems={"center"}
                direction={"column"}
              >
                <Image
                  alt={e?.content || ""}
                  src={e?.imageSrc || ""}
                  width={80}
                  height={80}
                ></Image>
                <Typography
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginTop: 26,
                    marginBottom: 16,
                  }}
                >
                  {e?.title}
                </Typography>
                <Typography
                  align="center"
                  style={{ color: "#8794BA", fontSize: 16 }}
                >
                  {e?.content}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default HomePage;
