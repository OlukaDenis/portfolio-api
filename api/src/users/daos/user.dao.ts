import { CreateUserDto, PatchUserDto } from '../dto';
import { helpers } from '../../common';
import UserModel from '../model/user.model'
class UserDao {

    constructor() {
        console.log('Created new instance of UsersDao');
    }

    async add(dto: CreateUserDto) {
        const user = new UserModel({ ...dto })
        return await user.save();
    }

    async get(limit = helpers.pageSize, page = 0) {
        return UserModel.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getById(id: string) {
        return UserModel.findById(id).exec();
    }

    async removeById(id: string) {
        return UserModel.deleteOne({ _id: id }).exec();
    }

    async getByEmail(email: string) {
        return UserModel.findOne({ email: email }).exec();
    }

    async getUserByEmailWithPassword(email: string) {
        return UserModel.findOne({ email: email })
            .select('_id email phone +password')
            .exec();
    }

    async patchById(id: string, dto: PatchUserDto) {
        const existingUser = await UserModel.findOneAndUpdate(
            { _id: id },
            { $set: dto },
            { new: true }
        ).exec();

        return existingUser;
    }
}

export default new UserDao();