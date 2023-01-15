import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import envConfig from '../../common/config'
import { sendSuccess, sendFailure } from '../../common';

const jwtSecret = envConfig.JWT_SECRET
const tokenExpirationInSeconds = 36000;

class AuthController {
    async createJWT(req: express.Request, res: express.Response) {
        try {
            const refreshId = req.body.userId + jwtSecret;
            const salt = crypto.createSecretKey(crypto.randomBytes(16));
            const hash = crypto
                .createHmac('sha512', salt)
                .update(refreshId)
                .digest('base64');
            req.body.refreshKey = salt.export();
            const token = jwt.sign(req.body, jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            });
            return sendSuccess(res, { accessToken: token, refreshToken: hash }, 201)
        } catch (err) {
            console.log('createJWT error: %O', err);
            const message = 'Failed to generate JWT token'
            return sendFailure(res, message, 500);
        }
    }
}

export default new AuthController()