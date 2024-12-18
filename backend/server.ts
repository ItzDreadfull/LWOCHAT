import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes';
import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';

import dbConnect from './db/dbConnect';
import { app, server } from './socket/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;



app.use(express.json()); //to sparse the including results with JSON payloads (from req.body)
app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



// app.get('/', (req: Request, res: Response) => {
//     res.send("Successfull you can create router.")
// })


server.listen(PORT, () => {
    dbConnect();
    console.log(`app Running on port ${PORT}`);
})

