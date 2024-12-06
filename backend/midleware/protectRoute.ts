import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import responseMsg from "../helpers/responseMsg";
import { configDotenv } from "dotenv";
import UserModel, { User } from "../models/User";

configDotenv();

interface CustomRequest extends Request {
    user?: User;
}


const protectRoute = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return responseMsg(res, false, "Unauthroize - No Token Provided", 401)
        }
        const Secreat_code = process.env.JWT_SECREAT || "";
        const decoded = jwt.verify(token, Secreat_code);

        if (!decoded) {
            return responseMsg(res, false, "Unauthorize - Invalid Token", 401);
        }
        const { userId }: string | any = decoded;

        const user = await UserModel.findById(userId).select("-password"); //-password for removing password field

        if (!user) {
            return responseMsg(res, false, "User not found", 404);
        } else {
            req.user = user as User;
        }
        next();
    } catch (error) {

    }
}

export default protectRoute;