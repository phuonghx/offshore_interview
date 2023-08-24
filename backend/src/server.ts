import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { healthCheckRouter } from "./routes/healthcheck";

const prisma = new PrismaClient();

async function main() {
    const app = express();
    app.use(express.json());
    app.use(
        cors({
            origin: "http://localhost:3000",
        })
    );

    // Routes
    app.use("/healthcheck", healthCheckRouter);

    app.listen(process.env.PORT, () => {
        console.log(`Server is up and running at ${process.env.PORT}`);
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
