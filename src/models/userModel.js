import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String
    }
},
{
    timestamps: true
})


export const userModel = mongoose.model("user",userSchema)

 userModel