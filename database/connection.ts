import mongoose from "mongoose";

import { config } from "dotenv";
const MONGO_URL = config().parsed?.MONGO_URL || ""

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        // console.log("Database connected");
    } catch (error) {
        // console.log("Database connection error", error);
    }
}

export default connect;