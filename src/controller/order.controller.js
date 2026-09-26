
import orderModel from "../models/order.model.js";
import fooditemModel from "../models/fooditem.model.js";


// =========================================================
// CREATE ORDER
// =========================================================

const createOrder = async (req, res) => {
  try {

    const {
      foodItem,
      quantity,
      deliveryAddress,
      contactNumber,
      totalAmount
    } = req.body;


    // =========================================
    // VALIDATION
    // =========================================

    if (!foodItem) {
      return res.status(400).json({
        success: false,
        message: "Food item is required"
      });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required"
      });
    }

    if (!contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Contact number is required"
      });
    }

    if (
      totalAmount === undefined ||
      totalAmount === null ||
      totalAmount < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Total amount is required"
      });
    }


    // =========================================
    // FIND FOOD ITEM
    // =========================================

    const findFoodItem = await fooditemModel.findById(
      foodItem
    );

    if (!findFoodItem) {
      return res.status(404).json({
        success: false,
        message: "Food item not found"
      });
    }


    // =========================================
    // CHECK FOOD PARTNER
    // =========================================

    if (!findFoodItem.foodPartner) {
      return res.status(400).json({
        success: false,
        message: "Food partner not found for this food item"
      });
    }


    // =========================================
    // CREATE ORDER
    // =========================================

    const order = await orderModel.create({

      user: req.user._id,

      foodItem: findFoodItem._id,

      foodPartner: findFoodItem.foodPartner,

      quantity,

      deliveryAddress,

      contactNumber,

      totalAmount,

      status: "pending"

    });


    // =========================================
    // RESPONSE
    // =========================================

    return res.status(201).json({

      success: true,

      message: "Order placed successfully",

      order

    });


  } catch (error) {

    console.log(
      "Create order error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Unable to create order"

    });

  }
};



// =========================================================
// GET USER ORDERS
// =========================================================

const getUserOrders = async (req, res) => {

  try {

    const orders = await orderModel
      .find({
        user: req.user._id
      })
      .populate(
        "foodItem",
        "name description video"
      )
      .populate(
        "foodPartner",
        "shopName address"
      )
      .sort({
        createdAt: -1
      });


    return res.status(200).json({

      success: true,

      message: "User orders fetched successfully",

      orders

    });


  } catch (error) {

    console.log(
      "Get user orders error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Unable to fetch orders"

    });

  }
};



// =========================================================
// GET FOOD PARTNER ORDERS
// =========================================================

const getFoodPartnerOrders = async (req, res) => {

  try {

    const orders = await orderModel
      .find({
        foodPartner: req.foodPartner._id
      })
      .populate(
        "foodItem",
        "name description video"
      )
      .populate(
        "user",
        "name email"
      )
      .sort({
        createdAt: -1
      });


    return res.status(200).json({

      success: true,

      message: "Food partner orders fetched successfully",

      orders

    });


  } catch (error) {

    console.log(
      "Get food partner orders error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Unable to fetch orders"

    });

  }
};



// =========================================================
// UPDATE ORDER STATUS
// =========================================================

const updateOrderStatus = async (req, res) => {

  try {

    const { orderId } = req.params;

    const { status } = req.body;


    // =========================================
    // VALID STATUS
    // =========================================

    const validStatuses = [
      "pending",
      "accepted",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled"
    ];


    if (!validStatuses.includes(status)) {

      return res.status(400).json({

        success: false,

        message: "Invalid order status"

      });

    }


    // =========================================
    // FIND ORDER
    // =========================================

    const order = await orderModel.findById(
      orderId
    );


    if (!order) {

      return res.status(404).json({

        success: false,

        message: "Order not found"

      });

    }


    // =========================================
    // SECURITY
    // =========================================
    // Make sure this order belongs to the
    // logged-in food partner.
    // =========================================

    if (
      order.foodPartner.toString() !==
      req.foodPartner._id.toString()
    ) {

      return res.status(403).json({

        success: false,

        message: "You are not authorized to update this order"

      });

    }


    // =========================================
    // UPDATE STATUS
    // =========================================

    order.status = status;

    await order.save();


    // =========================================
    // RESPONSE
    // =========================================

    return res.status(200).json({

      success: true,

      message: "Order status updated successfully",

      order

    });


  } catch (error) {

    console.log(
      "Update order status error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Unable to update order status"

    });

  }
};



export {
  createOrder,
  getUserOrders,
  getFoodPartnerOrders,
  updateOrderStatus
};

