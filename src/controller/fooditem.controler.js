import fooditemModel from "../models/fooditem.model.js";
import imagekit, { uploadFile } from "../service/imagekit.js";
import { v4 as uuidv4 } from "uuid";

async function createFood(req, res) {
    console.log(req.foodPartner);
    console.log(req.body);
    console.log(req.file);

    const fileName = uuidv4();

    const fileUploadResult = await uploadFile(
        req.file.buffer,
        fileName
    );

    console.log("Uploaded file URL:", fileUploadResult.url);


    const foodItem = await fooditemModel.create({
        name:req.body.name,
        description : req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    })
    res.status(200).json({
        success: true,
        message: "Food item created",
        url: fileUploadResult.url,
        foodItem
    });
}


async function getFoodItems(req, res) {
    try {

        const findFoodItems = await fooditemModel
            .find({})
            .populate("foodPartner", "shopName");

        console.log(
            "========== FOOD ITEMS =========="
        );

        console.log(
            JSON.stringify(findFoodItems, null, 2)
        );

        console.log(
            "================================"
        );

        return res.status(200).json({
            message: "Food items fetched successfully",
            findFoodItems
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch food items"
        });
    }
}

async function getFoodPartnerItems(req, res) {
    try {

        const foodItems = await fooditemModel.find({
            foodPartner: req.foodPartner._id
        });

        res.status(200).json({
            success: true,
            message: "Food partner items fetched successfully",
            foodItems
        });

    } catch (error) {

        console.log("Food partner items error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch food items"
        });
    }
}

export {
    createFood,
    getFoodItems,
    getFoodPartnerItems
};