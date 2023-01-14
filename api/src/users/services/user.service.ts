import { CRUD } from "../../common";
import { CreateUserDto, PatchUserDto } from "../dto";
import UserDao from "../daos/user.dao";

class UserService implements CRUD {

    async create(dto: CreateUserDto) {
        return UserDao.add(dto);
    }

    async list(limit: number, page: number) {
        return UserDao.get(limit, page);
    }

    async getById(id: string) {
        return UserDao.getById(id);
    }

    async deleteById(id: string) {
        return "null";
    }

    async patchById(id: string, dto: PatchUserDto) {
        return UserDao.patchById(id, dto);
    }

    async getUserByEmail(email: string) {
        return UserDao.getByEmail(email);
    }
}

export default new UserService();