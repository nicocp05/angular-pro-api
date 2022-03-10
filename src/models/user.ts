import { Schema, model } from 'mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema: Schema<User> = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }

});

UserSchema.method('toJSON' , function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

export const UserModel = model<User>('User', UserSchema);