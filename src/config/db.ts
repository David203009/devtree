import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URI;
        const connection = await mongoose.connect(url);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}