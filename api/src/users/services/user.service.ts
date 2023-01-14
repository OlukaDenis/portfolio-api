import { CRUD } from "../../common";
import { CreateUserDto, PatchUserDto } from "../dto";
import UserDao from "../daos/user.dao";

class UserService implements CRUD {

    async create(resource: CreateUserDto) {
        resource.id = Math.floor(Math.random() * 1000000).toString();
        return UserDao.addUser(resource);
    }

    async list(limit: number, page: number) {
        return UserDao.getUsers();
    }

    async getById(id: string) {
        return UserDao.getUserById(id);
    }

    async deleteById(id: string) {
        return "null";
    }

    async patchById(id: string, resource: PatchUserDto) {
        return UserDao.patchUserById(id, resource);
    }
}

export default new UserService();