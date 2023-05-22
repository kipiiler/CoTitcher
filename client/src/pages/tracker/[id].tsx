import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import Student from "../../data/student.json";
import {
  Card,
  CardContent,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Image from "next/image";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  fill: true,
  animations: false,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

const Analysis = ({ analysisText }) => {
  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <h2>Analysis</h2>
      <p>{analysisText}</p>
    </div>
  );
};

interface BarChartP {
  analysisText: string;
  student: any;
  courseIn: string;
  workType: string;
}

function BarChart({ analysisText, student, courseIn, workType }: BarChartP) {
  const [selectedCourse, setSelectedCourse] = useState(courseIn);
  const [selectedWorkType, setSelectedWorkType] = useState(workType);
  const [scores, setScores] = useState();
  const [labels, setLabels] = useState();
  const [data, setData] = useState({
    datasets: [
      {
        label: "Scores",
        tension: 0.3,
        data: scores,
        borderColor: "rgb(128, 128, 128)",
        backgroundColor: "rgba(128, 128, 128, 0.3)",
      },
    ],
    labels: labels,
  });

  useEffect(() => {
    if (courseIn) setSelectedCourse(courseIn);
    if (workType) setSelectedWorkType(workType);
  }, [courseIn, workType]);

  useEffect(() => {
    if (student.courses.length != 0) {
      const course = student.courses.find((c) => c.course === selectedCourse);
      if (course) {
        const grades = course.grade;
        if (selectedWorkType == "homework") {
          grades &&
            grades.forEach((el) => {
              const s = el.homework.map((hw) => hw.grade);
              const l = el.homework.map((g) => g.title);
              setScores(s);
              setLabels(l);
            });
        }

        if (selectedWorkType == "quiz") {
          grades &&
            grades.forEach((el) => {
              const s = el.quiz.map((hw) => hw.grade);
              const l = el.quiz.map((g) => g.title);
              console.log("quiz effect");
              setScores(s);
              setLabels(l);
            });
        }
      }
    }
  }, [student, selectedCourse, selectedWorkType]);

  useEffect(() => {
    const temp = {
      datasets: [
        {
          label: "Scores",
          tension: 0.3,
          data: scores,
          borderColor: "rgb(128, 128, 128)",
          backgroundColor: "rgba(128, 128, 128, 0.3)",
        },
      ],
      labels: labels,
    };
    setData(temp);
    console.log(temp);
  }, [scores, labels, workType]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
      }}
    >
      <Grid container style={{ marginBottom: "20px" }}>
        <Grid item style={{ borderRadius: "100%", overflow: "hidden" }}>
          <Image
            src={
              "https://images.ctfassets.net/xjankvru4bwy/3TeRQIjGOt1OAPqupefsyL/8a289f76ce1483be0003fccb335103de/Brendan_Salisbury-US_Student-square.jpeg"
            }
            alt=""
            width={80}
            height={80}
          ></Image>
        </Grid>
        <Grid item style={{ marginLeft: 24 }}>
          <TextField
            select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{ marginRight: "10px" }}
          >
            <MenuItem value="">Select Course</MenuItem>
            {student?.courses?.map((e: any, i: any) => {
              return (
                <MenuItem key={i} value={e?.course}>
                  {e?.course}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            select
            value={selectedWorkType}
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedWorkType(e.target.value);
            }}
          >
            <MenuItem value="">Select Work Type</MenuItem>
            <MenuItem value="homework">Homework</MenuItem>
            <MenuItem value="quiz">Quiz</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <div
        style={{ display: "flex", alignItems: "flex-start", height: "auto" }}
      >
        <div style={{ height: "300px", width: "400px" }}>
          <Bar data={data} options={options} />
        </div>
        <Analysis analysisText={analysisText} />
      </div>
    </div>
  );
}

interface GradeComponent {
  title: string;
  grade: number;
}

// interface home

interface SuggestedMaterial {
  course: string;
  suggested_books: string[];
  suggested_websites: string[];
  suggested_videos: string[];
}

interface SuggestedMaterialsProps {
  suggestedMaterials: SuggestedMaterial[];
}

const SuggestedMaterials = ({
  suggestedMaterials,
}: SuggestedMaterialsProps) => {
  return (
    <div>
      {suggestedMaterials.map((material, index) => (
        <Card key={index} style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Course: {material.course}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Suggested Books:
            </Typography>
            <ul>
              {material.suggested_books.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
            <Typography variant="subtitle1" gutterBottom>
              Suggested Websites:
            </Typography>
            <ul>
              {material.suggested_websites.map((website, index) => (
                <li key={index}>
                  <Link href={website} target="_blank" rel="noopener">
                    {website}
                  </Link>
                </li>
              ))}
            </ul>
            <Typography variant="subtitle1" gutterBottom>
              Suggested Videos:
            </Typography>
            <ul>
              {material.suggested_videos.map((video, index) => (
                <li key={index}>
                  <Link href={video} target="_blank" rel="noopener">
                    {video}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default function TrackerID() {
  const router = useRouter();
  const [student, setStudent] = useState(Student[0]);

  useEffect(() => {
    if (Student.some((e) => String(e.studentID) === router.query.id)) {
      const stu = Student.find((e) => String(e.studentID) === router.query.id);
      if (stu) setStudent(stu);
    } else {
      router.push("/tracker");
    }
  }, [router]);

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
            {student.firstName} &nbsp;{student.lastName}
          </Typography>
        </Grid>
        <BarChart
          analysisText={student.student_analysis}
          student={student}
          courseIn={student?.courses[0]?.course}
          workType={"homework"}
        ></BarChart>
        {/* <GradeGraph course={student.courses[0]} /> */}
        <Grid item xs={12}>
          <Typography
            align="center"
            style={{
              marginTop: 24,
              marginBottom: 24,
              width: "100%",
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            Suggest Material
          </Typography>
          <SuggestedMaterials
            suggestedMaterials={student.suggested_materials}
          />
        </Grid>
      </Grid>
    </>
  );
}
