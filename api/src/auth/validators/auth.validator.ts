import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';
import { sendFailure } from '../../common';

class AuthValidator {
    async userAuthValidator(req: Request, res: Response, next: NextFunction) {
        const validation = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const { error } = validation.validate(req.body);

        if (error) {
            sendFailure(res, error.message, 400);
        } else {
            next();
        }
    }
}

export default new AuthValidator()