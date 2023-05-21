import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Student from "../../data/student.json";
import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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
