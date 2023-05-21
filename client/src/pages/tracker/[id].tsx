import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo} from "react";
import Student from "../../data/student.json";
import {Card, CardContent, Grid, Link, TextField, Typography} from "@mui/material";
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

const scores = [18, 24, 33, 45, 55];
const labels = ["HW1", "HW2", "HW3", "HW4", "HW5"];

// const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
// const labels = ["HW1", 200, 300, 400, 500, 600, 700];


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
        <div style={{ flex: 1, padding: '20px' }}>
            <h2>Analysis</h2>
            <p>{analysisText}</p>
        </div>
    );
};

function BarChart({analysisText, student, selectedCourse, selectedWorkType}) {
    const [selectedCourse, setSelectedCourse] = useState(selectedCourse);
    const [selectedWorkType, setSelectedWorkType] = useState(selectedWorkType);

    const course = student.courses.find(c => c.course === selectedCourse);
    console.log(student.courses)
    // const grades = course.grade;
    // const labels = grades.map(g => g.title);
    // const scores = grades.map(g => g.grade);

    useEffect(() => {
        console.log(student.courses)
        if(student.courses.length != 0) {
            const course = student.courses.find(c => c.course === selectedCourse);
            const grades = course.grade;
            const labels = grades.map(g => g.title);
            const scores = grades.map(g => g.grade);
            console.log(scores)
        }
    }, [student])

    const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: "Scores",
                    tension: 0.3,
                    data: scores,
                    borderColor: "rgb(128, 128, 128)",
                    backgroundColor: "rgba(128, 128, 128, 0.3)",
                },
            ],
            labels,
        };
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'auto' }}>
            <div style={{ marginBottom: '20px' }}>
                <TextField select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} style={{ marginRight: '10px' }}>
                    <MenuItem value="">Select Course</MenuItem>
                    <MenuItem value="course1">Course 1</MenuItem>
                    <MenuItem value="course2">Course 2</MenuItem>
                    // Add more course options...
                </TextField>

                <TextField select value={selectedWorkType} onChange={(e) => setSelectedWorkType(e.target.value)}>
                    <MenuItem value="">Select Work Type</MenuItem>
                    <MenuItem value="homework">Homework</MenuItem>
                    <MenuItem value="quiz">Quiz</MenuItem>
                    // Add more work type options...
                </TextField>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', height: 'auto' }}>
                <div style={{ height: '300px', width: '400px' }}>
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

// const GradeGraph2: React.FC<GradeGraphProps> = ({ student }) => {
//   const [selectedCourse, setSelectedCourse] = useState<string>(
//     student.courses[0].course
//   );
//   const [selectedComponent, setSelectedComponent] =
//     useState<string>("homework");

//   const handleCourseChange = (event: any) => {
//     setSelectedCourse(event.target.value as string);
//   };

//   const handleComponentChange = (event: any) => {
//     setSelectedComponent(event.target.value as string);
//   };

//   const selectedCourseData = student.courses.find(
//     (course) => course.course === selectedCourse
//   );

//   const selectedComponentData =
//     selectedCourseData &&
//     (selectedComponent === "homework"
//       ? selectedCourseData.grade.homework
//       : selectedCourseData.grade.quiz);

//   const chartData = {
//     labels: selectedComponentData?.map((component) => component.title) || [],
//     datasets: [
//       {
//         label: `Student ${selectedComponent} Grades`,
//         data: selectedComponentData?.map((component) => component.grade) || [],
//         backgroundColor: "rgba(75,192,192,0.6)",
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//   };

//   return (
//     <div>
//       <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
//         <InputLabel id="course-select-label">Select Course</InputLabel>
//         <Select
//           labelId="course-select-label"
//           id="course-select"
//           value={selectedCourse}
//           onChange={handleCourseChange}
//           label="Select Course"
//         >
//           {student.courses.map((course, index) => (
//             <MenuItem key={index} value={course.course}>
//               {course.course}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl variant="outlined">
//         <InputLabel id="component-select-label">
//           Select Grade Component
//         </InputLabel>
//         <Select
//           labelId="component-select-label"
//           id="component-select"
//           value={selectedComponent}
//           onChange={handleComponentChange}
//           label="Select Grade Component"
//         >
//           <MenuItem value="homework">Homework</MenuItem>
//           <MenuItem value="quiz">Quiz</MenuItem>
//         </Select>
//       </FormControl>

//       <Bar data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// interface GradeGraphProps2 {
//   course: Course;
// }
// const GradeGraph: React.FC<GradeGraphProps2> = ({ course }) => {
//   const homeworkData = course.grade.homework.map(
//     (component) => component.grade
//   );
//   const homeworkLabels = course.grade.homework.map(
//     (component) => component.title
//   );

//   const chartData = {
//     labels: homeworkLabels,
//     datasets: [
//       {
//         label: "Homework Grades",
//         data: homeworkData,
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//   };

//   return <Bar data={chartData} options={chartOptions} />;
// };

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
          <BarChart analysisText={student.student_analysis} student={student} selectedCourse={student?.courses[0]?.course} selectedWorkType={"homework"}></BarChart>
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
