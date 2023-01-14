import { BaseRoutesConfig } from "../routes/base/base-route.config";
import * as express from "express";

import userController from "./controllers/user.controller";
import userValidator from "./validators/user.validator";

export class UserRoutes extends BaseRoutesConfig {

    constructor(app: express.Application) {
        super(app, "UserRoutes");
    }

    configureRoutes() {

        this.app.route("/users")
            .get(userController.listUsers)
            .post(
                userValidator.createUserValidator,
                userController.createUser
            );

        this.app.route("/users/:id")
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.id}`);
            })
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.id}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.id}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.id}`);
            });

        return this.app;
    }
}