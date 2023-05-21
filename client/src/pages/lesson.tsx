import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const generated_sample =
  "Standards\n\nSubject: Mathematics\n\nGrade level: 3rd grade\n\nObjective: Students will be able to solve addition and subtraction problems using strategies such as counting on and counting back to obtain the correct solution.\n\nFL standards: MAFS.3.OA.1.1, MAFS.3.OA.1.2, MAFS.3.OA.1.3\n\nMaterials Needed:\n\n- Whiteboard and dry erase markers\n- Number line\n- Base ten blocks\n- Addition and subtraction flashcards\n- Printouts of addition and subtraction word problems\n- Crayons or colored pencils\n\nProcedure:\n\nIntroduction (5 minutes):\n\n- Greet students and review the objective for today's lesson.\n- Ask students if they remember any strategies for solving addition and subtraction problems.\n\nDirect Instruction (20 minutes):\n\n- Display the number line and explain to students how it can be used to add and subtract numbers.\n- Model counting on and counting back on the number line, and then give students an opportunity to practice with a partner.\n- Introduce the use of base ten blocks to represent numbers during addition and subtraction.\n- Use addition and subtraction flashcards to review number facts with the class, and have students practice solving them using base ten blocks. \n- Hand out printed addition and subtraction word problems and have students solve them in groups using crayons or colored pencils to highlight important information.\n\nGuided Practice (15 minutes):\n\n- Write an addition or subtraction problem on the board and ask students to solve it using the strategies they have learned.\n- Encourage students to work in pairs or small groups and discuss their thinking with each other.\n- Circulate around the classroom and provide support and guidance as needed.\n\nIndependent Practice (15 minutes):\n\n- Distribute independent practice worksheets to students.\n- Remind them to use the strategies they have learned and encourage them to check their work.\n- Collect worksheets at the end of the lesson to monitor student progress.\n\nClosure (5 minutes):\n\n- Ask a few students to share their strategies for solving an addition or subtraction problem with the class.\n- Summarize the key concepts covered in the lesson and review the objective.\n- Assign homework if needed. \n\nAccommodations for ADHD students:\n\n- Provide frequent breaks to help them refocus.\n- Use visual aids such as the number line and base ten blocks to make lessons more engaging.\n- Give verbal reminders to stay on task during independent practice.\n- Provide extra support and guidance during guided practice.";

function DashBoard() {
  const [input, setInput] = useState({
    topic: "",
    difficulty: "",
    classData: "",
    otherRequire: "",
    standard: "",
  });

  const [result, setResult] = useState("");

  async function handleGeneratePlan() {
    console.log("running");
    await axios
      .post("http://localhost:8000/lessongen", input)
      .then((res) => {
        if (res) {
          console.log(res);
          setResult(res.data.content);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(event: any) {
    let value = event.target.value;
    let name = event.target.name;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

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
          Lesson Planner
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Grid container style={{ marginBottom: 64 }}>
            <Grid item xs={12}>
              <Typography>Lesson Topic</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={input.topic}
                name="topic"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container style={{ marginBottom: 64 }}>
            <Grid item xs={12}>
              <Typography>Standard</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={input.standard}
                name="standard"
                style={{ width: "100%" }}
                select
              >
                <MenuItem value={"National"}>National</MenuItem>
                <MenuItem value={"Virginia"}>Virginia</MenuItem>
                <MenuItem value={"Texas"}>Texas</MenuItem>
                <MenuItem value={"Alaska"}>Alaska</MenuItem>
                <MenuItem value={"Florida"}>Florida</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={12}>
              <Typography style={{ width: "100%" }}>
                Difficulty Level
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={input.difficulty}
                name="difficulty"
                select
                style={{ width: "100%" }}
              >
                <MenuItem value={"Easy"}>Easy</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Hard"}>Hard</MenuItem>
                <MenuItem value={"College Level"}>College Level</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={12}>
              <Typography style={{ width: "100%" }}>Class Data</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={input.classData}
                name="classData"
                select
                style={{ width: "100%" }}
              >
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
          <TextField
            style={{ width: "100%" }}
            onChange={handleInputChange}
            value={input.otherRequire}
            name="otherRequire"
            multiline
            rows={7}
          />
        </Grid>
        <Grid item style={{ marginTop: 24, marginRight: 24 }}>
          <Button variant="contained">
            <Typography>Upload file addition document</Typography>
          </Button>
        </Grid>
        <Grid item style={{ marginTop: 24 }}>
          <Button variant="contained" onClick={() => handleGeneratePlan()}>
            <Typography>Generate Lesson Plan</Typography>
          </Button>
        </Grid>
      </Grid>

      {result != "" && (
        <Grid container justifyContent={"center"} style={{ marginTop: 80 }}>
          <Grid item>
            <Typography style={{ fontSize: 24 }}>
              Lesson Plan&rsquo;s Result
            </Typography>
          </Grid>
          <TextDisplayer text={result} />
          <br />
          <br />
          <Grid container justifyContent={"center"} style={{ margin: 24 }}>
            <Grid item>
              <Button variant="contained">
                <Typography>Regenerate</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained">
                <Typography>Save</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

interface TextDisplayerProps {
  text: string;
}

const TextDisplayer: React.FC<TextDisplayerProps> = ({ text }) => {
  const renderText = (text: string) => {
    const lines = text.split("\n");
    let currentHeader = "";

    return lines.map((line, index) => {
      if (line === "") {
        // Two new line characters - add <br> tag
        return <br key={index} />;
      } else if (line.startsWith("- ")) {
        // Indentify hyphen - create list item
        return <li key={index}>{line.substring(2)}</li>;
      } else if (line.includes(": ")) {
        // Identify header by line with ':'
        const [header, content] = line.split(": ");
        currentHeader = header;
        return (
          <>
            <Typography variant="h6" key={index}>
              {header}:
            </Typography>
            <Typography>{content}</Typography>
          </>
        );
      } else {
        // Single new line character - display in new line
        return (
          <Typography key={index} component="div">
            {line}
          </Typography>
        );
      }
    });
  };

  return <div>{renderText(text)}</div>;
};

export default DashBoard;
