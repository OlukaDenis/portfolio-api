// /* eslint-disable @ts-ignore */
import { CreateUserDto, PatchUserDto } from '../dto';
import mongooseService from '../../common';
import { helpers } from '../../common';
class UserDao {
    users: Array<CreateUserDto> = [];

    Schema = mongooseService.getMongoose().Schema;

    userSchema = new this.Schema({
        phone: {
            type: String,
            required: 'Phone required'
        },
        email: {
            type: String,
            required: 'Email required'
        },
        firstName: {
            type: String,
            required: 'First name required'
        },
        lastName: {
            type: String,
            required: 'Last name required'
        },
        password: {
            type: String,
            select: false
        },
    });

    User = mongooseService.getMongoose().model('Users', this.userSchema);

    constructor() {
        console.log('Created new instance of UsersDao');
    }

    async add(dto: CreateUserDto) {
        const user = new this.User({ ...dto })
        return await user.save();
    }

    async get(limit = helpers.pageSize, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getById(id: string) {
        return this.User.findById(id).exec();
    }

    async removeById(id: string) {
        return this.User.deleteOne({ _id: id }).exec();
    }

    async getByEmail(email: string) {
        return this.User.findOne({ email: email }).exec();
    }

    async getUserByEmailWithPassword(email: string) {
        return this.User.findOne({ email: email })
            .select('_id email phone +password')
            .exec();
    }

    async patchById(id: string, dto: PatchUserDto) {
        const existingUser = await this.User.findOneAndUpdate(
            { _id: id },
            { $set: dto },
            { new: true }
        ).exec();

        return existingUser;
    }
}

export default new UserDao();