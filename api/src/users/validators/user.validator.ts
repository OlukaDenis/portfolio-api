import * as Joi from "joi"
import { NextFunction, Request, Response } from "express";
import { sendFailure } from "../../common";

class UserValidator {
    async createUserValidator(req: Request, res: Response, next: NextFunction) {
        const validation = Joi.object({
            phone: Joi.string().length(12).required(),
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        });

        const { error } = validation.validate(req.body);

        if (error) {
            sendFailure(res, error.message, 400);
        } else {
            next();
        }
    }
}

export default new UserValidator();