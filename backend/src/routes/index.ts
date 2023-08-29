import { Router } from "express";
import { todoRouter } from "./todo";
import { healthCheckRouter } from "./healthcheck";

const router = Router();

router.use("/todos", todoRouter);
router.use("/healthcheck", healthCheckRouter);

export default router;
