import { NextFunction, Request, Response } from "express"
import UserModel from "../models/User";
import bcrypt from "bcryptjs";
import responseMsg from "../helpers/responseMsg";
import dbConnect from "../db/dbConnect";
import genarateAwtToken from "../utils/generateToken";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail";


export const signUpUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await dbConnect();

    try {
        const { fullName, username, email, password, confirmPassword, gender } = await req.body;


        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return responseMsg(res, false, 'Username is already taken', 400);
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({ email });
        if (existingUserVerifiedByEmail) {
            return responseMsg(res, false, "This Email is already taken.Please try using diffrent email", 400);
        }

        if (password !== confirmPassword) {
            return responseMsg(res, false, "password doesn't match | password and confirm password must be same", 400);

        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`


        const newUser = new UserModel({
            fullname: fullName,
            username,
            email,
            password: hashedPassword,
            verifyCode,
            isVerified: true,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        })



        if (!newUser) {
            return responseMsg(res, false, "some internul error occured", 500)
        } else {
            await newUser.save();
            const resultId: any = newUser._id;

            const emailResponse = await sendVerificationEmail(
                email, fullName, verifyCode
            )

            if (!emailResponse.success) {
                return responseMsg(res, false, emailResponse.message, 500)
            }

            genarateAwtToken(resultId.toString(), res);
            res.status(201).json({
                _id: resultId.toString(),
                fullName: newUser.fullname,
                profilePic: newUser.profilePic,
            })
        }

    } catch (error) {
        console.log("error registering user", error)
        return responseMsg(res, false, "Error registering user", 500);
    }
}


// Todo implement this with session
export const verifyUser = async (req: Request, res: Response) => {
    await dbConnect()

    try {
        const { username, code } = await req.body();
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return responseMsg(res, false, "User not found", 404)
        }

        const isCodeValid = user.verifyCode === code
        // const isCodeNotExpire = new Date(user.verifyCodeExpiry) > new Date()


        if (isCodeValid /*&& isCodeNotExpire*/) {
            user.isVerified = true
            await user.save()

            return responseMsg(res, true, "Account verify secessfully", 200)

        } else {
            return responseMsg(res, false, "Incorrect Verification code", 400)
        }

    } catch (error) {
        console.error("Error checking Username", error)
        return responseMsg(res, false, "Error checking username", 500)
    }
}

export const logInUser = async (req: Request, res: Response) => {
    await dbConnect();
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (!user) {
            return responseMsg(res, false, "Invalid Username or password.", 404);
        }

        if (user) {
            const id: string | any = user._id;
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect === false) {
                return responseMsg(res, false, "Invalid Username or password.", 400);
            } else {
                // Pass the string ID to your token generation function
                genarateAwtToken(id.toString(), res);

                res.status(201).json({
                    _id: id.toString(),
                    fullName: user.fullname,
                    profilePic: user.profilePic,
                })

            }
        }

    } catch (error) {
        console.log("error login user", error)
        return responseMsg(res, false, "Error login user", 500);
    }
}

export const logOutUser = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        return responseMsg(res, true, "User Logout Successfull", 200);
    } catch (error) {
        console.log("Error in Logout user", error)
        return responseMsg(res, false, "Internal Server Error", 500);
    }
}