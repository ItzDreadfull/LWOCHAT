import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();


type ConnectionObjct = {
    isConnect?: number
}

const connection: ConnectionObjct = {}

const mongoUrl = process.env.MONGO_DB_URL;

async function dbConnect(): Promise<void> {
    if (connection.isConnect) {
        console.log("Already connected to database");
        return;
    }

    try {

        const db = await mongoose.connect(mongoUrl || '', {});

        connection.isConnect = db.connections[0].readyState;

        console.log("DB Connected successfully");

    } catch (error) {
        console.log("Database connected failed", error)
        process.exit(1)
    }

}
export default dbConnect;