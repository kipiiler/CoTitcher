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

app.post("/lessongen/", async(req, res) => {
    console.log(req.body)
    const {topic, difficulty, classData, otherRequire, standard} = req.body;
    let prompt = classData + " level "  + topic + " lesson plan " + difficulty + difficulty + "," + otherRequire
        + "compliance with " + standard;
    const configuration = new Configuration({
        apiKey: process.env.OPEN_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
    });
    res.json(completion.data.choices[0].message);
})

app.post("/quizgen/", async(req, res) => {
    console.log(req.body)
    const {topic, difficulty, classData, otherRequire, standard} = req.body;
    let prompt = + classData + " level "  + topic + " quiz " + difficulty + "," + otherRequire +
        "compliance with " + standard + " that can be done in";
    const configuration = new Configuration({
        apiKey: process.env.OPEN_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
    });
    res.json(completion.data.choices[0].message);
})

// app.post("/quizregen/", async(req, res) => {
//     let prompt = lastData + " level "  + lastTopic + " quiz " + lastDifficulty + "," + lastRequire;
//     console.log(prompt)
//     const configuration = new Configuration({
//         apiKey: process.env.OPEN_API_KEY,
//     });
//     const openai = new OpenAIApi(configuration);
//     const completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{role: "user", content: prompt}],
//     });
//     res.json(completion.data.choices[0].message);
// })
