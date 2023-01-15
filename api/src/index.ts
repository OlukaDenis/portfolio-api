import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';

import { BaseRoutesConfig, errorHandler, notFoundHandler } from './common';
import { UserRoutes } from './users/user.route';
import { AuthRoutes } from './auth/auth.router';

const debugLog: debug.IDebugger = debug('app');

const routes: Array<BaseRoutesConfig> = [];

dotenv.config();

// const dotenvResult = dotenv.config();
// if (dotenvResult.error) {
//     throw dotenvResult.error;
// }

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

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

routes.push(new AuthRoutes(app))
routes.push(new UserRoutes(app));

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
    debugLog(`Listening on port ${PORT}`);
    console.log(`Listening on port ${PORT}`);
});