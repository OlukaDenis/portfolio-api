import Joi from 'joi'
import debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { sendFailure } from '../../common';
import userService from '../services/user.service';

const log: debug.IDebugger = debug('app:users-controller');
class UserValidator {
    async createUserValidator(req: Request, res: Response, next: NextFunction) {
        const validation = Joi.object({
            phone: Joi.string().length(12).required(),
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            password: Joi.string().required()
        });

        const { error } = validation.validate(req.body);

        if (error) {
            sendFailure(res, error.message, 400);
        } else {
            next();
        }
    }

    async validateSameEmailDoesntExist(req: Request, res: Response, next: NextFunction) {
        const user = await userService.getUserByEmail(req.body.email);
        if (user) {
            sendFailure(res, 'User email already exists', 400);
        } else {
            next();
        }
    }

    async validateSameEmailBelongToSameUser(req: Request, res: Response, next: NextFunction) {
        const user = await userService.getUserByEmail(req.body.email);
        if (user && user.id === req.params.id) {
            next();
        } else {
            sendFailure(res, 'Invalid email', 400);
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchEmail = async (req: Request, res: Response, next: NextFunction) => {
        if (req.body.email) {
            log('Validating email', req.body.email);

            this.validateSameEmailBelongToSameUser(req, res, next);
        } else {
            next();
        }
    }

    async validateUserExists(req: Request, res: Response, next: NextFunction) {
        const user = await userService.getById(req.params.id);
        if (user) {
            next();
        } else {
            sendFailure(res, `User ${req.params.id} not found`, 400);
        }
    }
}

export default new UserValidator();