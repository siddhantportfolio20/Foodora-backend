import mongoose  from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected sucessfully");
    }catch(err){
        console.log(err.message);
    }
}

export default connectDB