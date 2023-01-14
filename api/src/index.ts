import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import debug from 'debug';

import { BaseRoutesConfig } from "./routes/base/base-route.config";
import { UserRoutes } from "./users/user.route";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { errorHandler } from "./middleware/error.middleware";
const debugLog: debug.IDebugger = debug('app');

const routes: Array<BaseRoutesConfig> = [];

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

// if (!process.env.DEBUG) {
//     loggerOptions.meta = false;
// }

// app.use(expressWinston.logger(loggerOptions));

routes.push(new UserRoutes(app));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
    debugLog(`Listening on port ${PORT}`);
    console.log(`Listening on port ${PORT}`);
});