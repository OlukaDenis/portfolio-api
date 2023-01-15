import express from 'express';
import userService from '../../users/services/user.service';
import * as argon2 from 'argon2';
import { sendFailure } from '../../common';

class AuthMiddleware {

    async verifyUserPassword(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user: any = await userService.getUserByEmailWithPassword(
            req.body.email
        );
        if (user) {
            const passwordHash = user.password;
            if (await argon2.verify(passwordHash, req.body.password)) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    phone: user.phone
                };
                return next();
            }
        }
        // Giving the same message in both cases
        // helps protect against cracking attempts:
        sendFailure(res, 'Invalid email or password', 400);
    }
}

export default new AuthMiddleware()