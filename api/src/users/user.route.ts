import { BaseRoutesConfig } from "../common/base/base-route.config";
import * as express from "express";

import userController from "./controllers/user.controller";
import userValidator from "./validators/user.validator";

export class UserRoutes extends BaseRoutesConfig {

    constructor(app: express.Application) {
        super(app, "UserRoutes");
    }

    configureRoutes() {

        this.app.route("/users")
            .get(userController.getList)
            .post(
                userValidator.createUserValidator,
                userValidator.validateSameEmailDoesntExist,
                userController.create
            );

        this.app.route(`/users/:id`)
            .all(userValidator.validateUserExists)
            .get(userController.getById)
            .delete(userController.remove);

        this.app.patch(`/users/:id`, [
            userValidator.validatePatchEmail,
            userController.patch
        ]);
        return this.app;
    }
}