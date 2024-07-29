import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

const connectDB = async ()=> {
    try {
        await mongoose.connect(URI)
        console.log("Connected to mongodb")
    } catch (error) {
       console.error("Connection failed") 
    }
}

export default connectDB;