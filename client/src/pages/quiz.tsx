import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function DashBoard() {
  const [input, setInput] = useState({
    topic: "",
    difficulty: "",
    classData: "",
    otherRequire: "",
    standard: "",
  });

  const [result, setResult] = useState("");

  async function handleGenerateQuiz() {
    console.log("running");
    await axios
      .post("http://localhost:8000/quizgen", input)
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
          Quiz Generation
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Grid container style={{ marginBottom: 64 }}>
            <Grid item xs={12}>
              <Typography>Quiz Topic</Typography>
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
                <MenuItem value={"Math"}>Math</MenuItem>
                <MenuItem value={"French"}>French</MenuItem>
                <MenuItem value={"Physics"}>Physics</MenuItem>
                <MenuItem value={"Classical Music"}>Classical Music</MenuItem>
                <MenuItem value={"Biology"}>Biology</MenuItem>
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
            <Typography>Upload sample quiz</Typography>
          </Button>
        </Grid>
        <Grid item style={{ marginTop: 24 }}>
          <Button variant="contained" onClick={() => handleGenerateQuiz()}>
            <Typography>Generate Quiz</Typography>
          </Button>
        </Grid>
      </Grid>

      {result != "" && (
        <Grid container justifyContent={"center"} style={{ marginTop: 48 }}>
          <Grid item>
            <Typography style={{ fontSize: 24, marginBottom: 40 }}>
              Quiz&rsquo;s Result
            </Typography>
          </Grid>
          <TextDisplayer text={result} />
          <Grid
            container
            spacing={1}
            justifyContent={"center"}
            style={{ margin: 24 }}
          >
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
            <Grid item>
              <Button variant="contained">
                <Typography>Upload to Canvas</Typography>
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
