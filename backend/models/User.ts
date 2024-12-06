import mongoose, { Document, Schema } from "mongoose";


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean,
    isAcceptingMessage: boolean;
    fullname: string,
    gender: string,
    phone_no: string
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid'] //regax for valid email check
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "verify Code is required"]
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },

    fullname: {
        type: String,
        required: false,

    },
    gender: {
        type: String,
        required: false,
        default: "Not given"
    },
    phone_no: {
        type: String,
        required: false,
    },
}, { timestamps: true })


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;
