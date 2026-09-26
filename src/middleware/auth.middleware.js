import foodPartnerModel from "../models/foodpartner.model.js";
import jwt from 'jsonwebtoken'
import {userModel} from "../models/userModel.js"
async function authFoodPartnerMiddleware(req,res,next) {
    const token = req.cookies.foodPartnerToken
    if(!token){
        return res.status(401).json({
            message:"Please login first"
        })
    }
    try{
        const decoded= jwt.verify(token,process.env.Jwt_secret)
        const foodPartner = await foodPartnerModel.findById(decoded.id)

        req.foodPartner = foodPartner
        next()
    }catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}


async function  authUserMiddleware(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:'Please Login first'
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.Jwt_secret)
        const user  = await userModel.findById(decoded.id)
        req.user = user
        
        next()
    }
    catch(err){
        res.status(400).json({
            message:"error in verification"
        })
    }
}


export {authFoodPartnerMiddleware,authUserMiddleware}