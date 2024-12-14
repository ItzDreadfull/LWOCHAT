import { Request, Response } from 'express';
import responseMsg from '../helpers/responseMsg';
import UserModel, { User } from '../models/User';

interface CustomRequest extends Request {
    user?: User;
}


const getUserForSlidbar = async (req: CustomRequest, res: Response) => {
    try {
        const loggedInUser = req.user;

        if (!loggedInUser) {
            return responseMsg(res, false, "User not authienticated", 401);
        }

        const filterUsers = await UserModel.find({ _id: { $ne: loggedInUser._id } }, { email: 0, username: 0, gender: 0, isVerified: 0, password: 0, verifyCode: 0 });

        return responseMsg(res, true, filterUsers, 200);

    } catch (error) {
        console.log("error in user controller", error);
        return responseMsg(res, false, "Internul server error", 500);
    }

}

export default getUserForSlidbar;