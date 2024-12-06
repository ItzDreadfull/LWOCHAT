import { Response } from 'express';
const responseMsg = (res: Response, success: boolean, message: string | any, statusCode: number): void => {
    res.status(statusCode).json({
        success,
        message,
    });
}

export default responseMsg

