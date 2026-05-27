import { createRequestHandler } from "@react-router/express";
import express from "express";

const app = express();

app.use(express.static("build/client"));

async function startApp() {
    const build = await import("./build/server/index.js");

    app.use(createRequestHandler({ build }));

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}

startApp();