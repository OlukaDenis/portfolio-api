import { Request, Response } from 'express';
import argon2 from 'argon2';
import userService from '../services/user.service';
import { sendSuccess } from '../../common';

class UsersController {
    async getList(req: Request, res: Response) {
        const users = await userService.list(50, 0);
        return sendSuccess(res, users, 200);
    }

    async getById(req: Request, res: Response) {
        const user = await userService.getById(req.params.id);
        return sendSuccess(res, user, 200);
    }

    async create(req: Request, res: Response) {
        req.body.password = await argon2.hash(req.body.password);
        const user = await userService.create(req.body);
        return sendSuccess(res, user, 201);
    }

    async patch(req: Request, res: Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        const result = await userService.patchById(req.params.id, req.body)
        return sendSuccess(res, result, 200);
    }

    async remove(req: Request, res: Response) {
        const result = await userService.deleteById(req.params.id)
        return sendSuccess(res, result, 200);
    }
}

export default new UsersController();