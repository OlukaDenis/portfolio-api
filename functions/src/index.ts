import * as functions from "firebase-functions";
import * as cors from "cors";
import helmet from "helmet"
import * as express from "express";

import appRouter from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const baseRoute = "/api/v1";

const app = express();
app.use(helmet())
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(baseRoute, appRouter);
app.use(errorHandler);

// app.get("/", (req, res) => () => {
//     console.log("Api called");
//     res.status(200).json({ message: "API running" });
// });

export const portfolio = functions
    .runWith({
        timeoutSeconds: 300,
        memory: "1GB",
    }).https.onRequest(app);
