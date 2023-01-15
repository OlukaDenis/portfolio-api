import express from 'express';
import { BaseRoutesConfig } from '../common';
import authValidator from './validators/auth.validator';
import authMiddleware from './middleware/auth.middleware';
import authController from './controllers/auth.controller';

export class AuthRoutes extends BaseRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/auth')
            .post(
                authValidator.userAuthValidator,
                authMiddleware.verifyUserPassword,
                authController.createJWT
            );

        return this.app;
    }
}