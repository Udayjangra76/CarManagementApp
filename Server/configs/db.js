import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection?.readyState >= 1) {
        console.log("you are already connected");
        return;
    }
    try {
        console.log("Connected to MongoDB Database")
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log("database cannot be connected")
        console.error(error);
    }
}

export default connectDB;