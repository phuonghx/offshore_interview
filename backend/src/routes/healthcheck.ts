import { PrismaClient } from "@prisma/client";
import express from "express";
const router = express.Router();

const prisma = new PrismaClient();

router.get("/", (_, res) => {
    res.json({
        status: `app is running at port ${process.env.PORT}`,
    });
});

router.get("/get", async (_, res) => {
    const user = await prisma.user.findMany();
    const todo = await prisma.todo.findMany();
    res.json({
        user,
        todo,
    });
});

export { router as healthCheckRouter };
