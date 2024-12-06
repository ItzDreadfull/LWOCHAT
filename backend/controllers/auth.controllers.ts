import { NextFunction, Request, Response } from "express"
import UserModel from "../models/User";
import bcrypt from "bcryptjs";
import responseMsg from "../helpers/responseMsg";
import dbConnect from "../db/dbConnect";
import genarateAwtToken from "../utils/generateToken";


export const signUpUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await dbConnect();

    try {
        const { username, email, password } = await req.body;

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return responseMsg(res, false, 'Username is already taken', 400);
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({ email });

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserVerifiedByEmail) {
            return responseMsg(res, false, "This Email is already taken.Please try using diffrent email", 400);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                isVerified: true,
                isAcceptingMessage: true,
                messages: []
            })

            if (newUser) {
                const userId: string | any = newUser._id;
                // Convert ObjectId to string
                const id = userId.toString();


                const result = await newUser.save();
                console.log(result);

                return responseMsg(res, true, "User registered successfull.Please login", 201);
            }
        }

        // send verifacation email
        // return responseMsg(res, false, "Some error ocred", 400);

    } catch (error) {
        console.log("error registering user", error)
        return responseMsg(res, false, "Error registering user", 500);
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
                return responseMsg(res, true, `Wellcome back ${username} `, 200);
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