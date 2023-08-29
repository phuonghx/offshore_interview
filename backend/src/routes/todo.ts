import { Router } from "express";
import prisma from "../prismaClient";
import { Prisma } from "@prisma/client";

const router = Router();

router
    .route("/")
    .get(async (req, res) => {
        const query = req.query;
        const findManyArgs: Prisma.TodoFindManyArgs = {
            where: {},
            orderBy: [{ id: "desc" }],
        };
        if (query?.status) {
            findManyArgs.where = {
                status: query?.status === "true" ? true : false,
            };
        }
        let todos = await prisma.todo.findMany(findManyArgs);
        res.json(todos);
    })
    .post(async (req, res) => {
        try {
            const body = req.body;
            let todo = await prisma.todo.create({
                data: {
                    ...body,
                    status: false,
                },
            });
            res.json(todo);
        } catch (ex) {
            res.status(500).json({
                message: "Something went wrong",
            });
        }
    });

router
    .route("/:id")
    .get(async (req, res) => {
        const id = Number(req.params?.id);
        let todo = await prisma.todo.findFirst({
            where: { id },
        });
        res.json(todo);
    })
    .put(async (req, res) => {
        try {
            const body = req.body;
            const id = Number(req.params?.id);
            let todo = await prisma.todo.findFirst({
                where: { id },
            });
            if (!todo) {
                return res.status(400).json({
                    message: `Not found todo with id ${id}`,
                });
            }
            const updatedTodo = await prisma.todo.update({
                where: { id },
                data: body,
            });
            return res.json(updatedTodo);
        } catch (ex) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    })
    .delete(async (req, res) => {
        try {
            const id = Number(req.params?.id);
            let todo = await prisma.todo.findFirst({
                where: { id },
            });
            if (!todo) {
                return res.status(400).json({
                    message: `Not found todo with id ${id}`,
                });
            }
            await prisma.todo.delete({
                where: { id },
            });
            return res.json({
                message: "Delete success",
            });
        } catch (ex) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
    });

export { router as todoRouter };
