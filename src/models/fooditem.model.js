import mongoose from "mongoose";


const fooditemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    video:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,

    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"foodPartnerModel"
    }
})

const fooditemModel = mongoose.model("fooditemModel",fooditemSchema)
export default fooditemModel