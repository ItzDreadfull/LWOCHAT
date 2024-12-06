import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes';
import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';

import dbConnect from './db/dbConnect';

dotenv.config();


const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



// app.get('/', (req: Request, res: Response) => {
//     res.send("Successfull you can create router.")
// })


app.listen(PORT, () => {
    try {
        console.log(`app Running on port ${PORT}`);
        dbConnect();
    } catch (error) {
        console.log("some error in server or db", error);
    }
})

