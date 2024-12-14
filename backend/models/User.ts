import mongoose, { Document, Schema } from "mongoose";


export interface User extends Document {
    fullname: string,
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean,
    gender: string,
    profilePic: string,
    phone_no: string
}

const UserSchema: Schema<User> = new Schema({
    fullname: {
        type: String,
        required: true,
    },
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
        default: false,
    },
    gender: {
        type: String,
        required: false,
        default: "Not given"
    },
    profilePic: {
        type: String,
        required: true,
        default: "Not given"
    },
    phone_no: {
        type: String,
        required: false,
    },
}, { timestamps: true })


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;
