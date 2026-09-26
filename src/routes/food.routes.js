import express from "express"
import { createFood,getFoodItems, getFoodPartnerItems } from "../controller/fooditem.controler.js"
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middleware/auth.middleware.js"
import multer from "multer"
const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})
// Post /api/food/  [protector] only the food provider can add the item 
router.post('/', authFoodPartnerMiddleware ,upload.single("video"), createFood)

// Get /api/food [protected]
// this is for users when the user will scrol it will bring the data 

router.get("/",authUserMiddleware,getFoodItems)

router.get(
    "/partner",
    authFoodPartnerMiddleware,
    getFoodPartnerItems
);
export default router