import mongoose, { Model } from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
    username: string;
    password: string;
    createdAt: Date;
    taskOrder: string[];
}

interface UserModel extends Model<IUser> {}

const UserSchema = new Schema<IUser, UserModel>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    taskOrder: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const User =
    mongoose.models.User ||
    mongoose.model<IUser, UserModel>("User", UserSchema);
