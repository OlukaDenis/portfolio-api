// /* eslint-disable @ts-ignore */

import debug from "debug";
import { CreateUserDto, PatchUserDto } from "../dto";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UserDao {
    users: Array<CreateUserDto> = [];

    constructor() {
        log("Created new instance of UsersDao");
    }

    async addUser(user: CreateUserDto) {
        this.users.push(user);
        return user;
    }

    async getUsers() {
        return this.users;
    }

    async getUserById(userId: string) {
        return this.users.find((user: { id: string }) => user.id === userId);
    }

    // async patchUserById(userId: string, user: PatchUserDto) {
    //     const objIndex = this.users.findIndex(
    //         (obj: { id: string }) => obj.id === userId
    //     );
    //     this.users.splice(objIndex, 1, user);
    //     return `${user.id} updated via put`;
    // }

    async patchUserById(userId: string, user: PatchUserDto) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        );
        const currentUser = this.users[objIndex];
        const allowedPatchFields = [
            "password",
            "firstName",
            "lastName",
            "permissionLevel",
        ];
        for (const field of allowedPatchFields) {
            if (field in user) {
                // currentUser[field] = user[field];
            }
        }
        this.users.splice(objIndex, 1, currentUser);
        return `${user.id} patched`;
    }
}

export default new UserDao();