import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.mongo_URL)
    console.log("DB connected successfully!")
}