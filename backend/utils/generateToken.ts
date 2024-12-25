import { configDotenv } from 'dotenv';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

configDotenv();

const genarateAwtToken = (userId: string, res: Response) => {
    const jwtSecret = process.env.JWT_SECREAT || "";
    const token = jwt.sign({ userId }, jwtSecret, {
        expiresIn: '15d'
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //prevent XSS attackes cross-site scripting
        sameSite: 'strict', // Helps prevent CSRF
        secure: process.env.NODE_ENV === 'production' ? true : false
    })
}

export default genarateAwtToken;