import mongoose from 'mongoose';

const connectDb = async () => {
    const mongoURI = process.env.MONGO_DB;
    if (!mongoURI) {
        console.log("MongoDB URI is undefined. Check your environment variables.");
        return;
    }

    await mongoose.connect(mongoURI)
        .then(() => console.log("MongoDB connected successfully !!"))
        .catch(err => console.log("Error in connecting to MongoDB:", err));
};

export default connectDb
