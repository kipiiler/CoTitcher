import cors from 'cors';
import * as dotenv from "dotenv";
import prisma from "../lib/prisma";
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
    const { email, firstName, lastName } = req.body;

    const newUser = await prisma.user.create({
        data: { email, firstName, lastName },
    });
    res.status(201).json(newUser);
});

// Update a user
app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { email, firstName, lastName },
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

