import * as functions from "firebase-functions";
import * as cors from "cors";
import helmet from "helmet"
import * as winston from "winston";
import * as expressWinston from "express-winston";
// import debug from "debug";
import { BaseRoutesConfig } from "./routes/base/base-route.config";
import { UserRoutes } from "./users/user.route";
import * as express from "express";

import { errorHandler } from "./middleware/error.middleware";

const routes: Array<BaseRoutesConfig> = [];
// const debugLog: debug.IDebugger = debug("app");

const app: express.Application = express();
app.use(helmet())
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

// app.get("/", (req, res) => () => {
//     console.log("Api called");
//     res.status(200).json({ message: "API running" });
// });

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UserRoutes(app));

export const portfolio = functions
    .runWith({
        timeoutSeconds: 300,
        memory: "1GB",
    }).https.onRequest(app);
