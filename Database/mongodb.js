import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from '../config/env.js'

if(!DB_URI)
{
     throw new Error("Database URI is not defined in environment variables");
}

const connectDB = async () => {
    try{
        await mongoose.connect(DB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log(`Connected to MongoDB database in ${NODE_ENV} mode`);
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        throw error; // Re-throw to handle in app.js
    }
}

export default connectDB;