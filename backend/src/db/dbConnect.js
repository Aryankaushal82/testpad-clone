import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/quiz`);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log('Error while connecting to MongoDB');
    }
}

export default dbConnect;