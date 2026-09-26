import express from "express";
import { loginFoodPartner, loginUser, logOutFoodPartner, logOutUser, registerFoodPatner, registerUser, getFoodPartnerProfile } from "../controller/authController.js";
import {  authFoodPartnerMiddleware} from "../middleware/auth.middleware.js"
const router = express.Router()


// user auth Apis
router.post('/user/register',registerUser)
router.post('/user/login',loginUser)
router.get('/user/logOut',logOutUser)


// Food Partner auth apis 
router.post('/food-partner/login',loginFoodPartner)
router.post('/food-partner/register',registerFoodPatner)
router.get("/food-partner/logout",logOutFoodPartner)
router.get(
  "/food-partner/me",
  authFoodPartnerMiddleware,
  getFoodPartnerProfile
);

export default router