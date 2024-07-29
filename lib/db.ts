import mongoose from "mongoose";
import { MONGO_URL } from "./constants";

const connection: { isConnected?: number } = {};

const connectDb = async () => {
    if (connection.isConnected) return;

    const db = await mongoose.connect(MONGO_URL);
    console.log("Connected to db");
    connection.isConnected = db.connections[0].readyState;
};

export { connectDb };
