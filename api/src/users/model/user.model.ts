import mongooseService from '../../common';

class UserSchema {
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

    UserModel = mongooseService.getMongoose().model('Users', this.userSchema);
}

export default new UserSchema().UserModel