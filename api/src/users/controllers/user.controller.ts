import { Request, Response } from "express";
import userService from "../services/user.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:users-controller");

class UsersController {
    async listUsers(req: Request, res: Response) {
        const users = await userService.list(100, 0);
        res.status(200).send(users);
    }

    async getUserById(req: Request, res: Response) {
        const user = await userService.getById(req.body.id);
        res.status(200).send(user);
    }

    async createUser(req: Request, res: Response) {
        const userId = await userService.create(req.body);
        res.status(201).send({ id: userId });
    }

    async patch(req: Request, res: Response) {
        log(await userService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: Request, res: Response) {
        log(await userService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeUser(req: Request, res: Response) {
        log(await userService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new UsersController();