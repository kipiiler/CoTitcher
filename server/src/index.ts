import cors from 'cors';
import * as dotenv from "dotenv";
import prisma from "../lib/prisma";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Healthy");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

app.use(cors({ origin: "<http://localhost:3000>" }))

console.log(process.env.SECRET_CODE);
app.get("/test", async (req, res) => {
    res.json("Hellow");
    // res.json(users);
});
// Get all users
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Get a user by id
app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(user);
});

// Create a new user
app.post("/users", async (req, res) => {
    console.log(req);
    const { email, firstName, lastName, password } = req.body;

    const newUser = await prisma.user.create({
        data: { email, firstName, lastName, password },
    });
    res.status(201).json(newUser);
});

// Update a user
app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { email, firstName, lastName, password } = req.body;
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { email, firstName, lastName, password },
    });
    res.json(updatedUser);
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) },
    });
    res.json(deletedUser);
});

app.post("/openai/", async(req, res) => {
    console.log(req.body)
    const { prompt } = req.body;

    const configuration = new Configuration({
        apiKey: process.env.OPEN_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const topics = ["lessonPlan", "analogies", "misconceptions", "questions", "differentiate", "rubric", "reflection"];
    let reponses: { [key: string]: string | undefined } = {};

    for (let topic of topics) {
        let finalP = prompt;
        if(topic !== "lessonPlan") {
            finalP = "Lesson plan " + topic + finalP
        } else {
            finalP = "Lesson plan" + finalP
        }
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: finalP}],
        });

        // Assumes the message is in completion.data.choices[0].message.content
        if (completion.data.choices && completion.data.choices[0] && completion.data.choices[0].message) {
            reponses[topic] = completion.data.choices[0].message.content;
        }
    }

    console.log(reponses);
    res.json(reponses);
})

