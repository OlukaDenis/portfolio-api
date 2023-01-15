import express from 'express';
import { BaseRoutesConfig } from '../common';
import authValidator from './validators/auth.validator';
import authMiddleware from './middleware/auth.middleware';
import authController from './controllers/auth.controller';
import jwtMiddleware from './middleware/jwt.middleware';

export class AuthRoutes extends BaseRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(): express.Application {
        this.app.post('/auth', [
            authValidator.userAuthValidator,
            authMiddleware.verifyUserPassword,
            authController.createJWT
        ]);

        this.app.post('/auth/refresh-token', [
            jwtMiddleware.validJWTNeeded,
            jwtMiddleware.verifyRefreshBodyField,
            jwtMiddleware.validRefreshNeeded,
            authController.createJWT,
        ]);

        return this.app;
    }
}