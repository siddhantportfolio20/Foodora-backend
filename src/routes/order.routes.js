
import express from "express";

import {
  createOrder,
  getUserOrders,
  getFoodPartnerOrders,
  updateOrderStatus
} from "../controller/order.controller.js";

import {
  authUserMiddleware,
  authFoodPartnerMiddleware
} from "../middleware/auth.middleware.js";


const router = express.Router();


// =========================================================
// USER ROUTES
// =========================================================

// Place a new order
// POST /order/api/
router.post(
  "/",
  authUserMiddleware,
  createOrder
);


// Get logged-in user's orders
// GET /order/api/user
router.get(
  "/user",
  authUserMiddleware,
  getUserOrders
);


// =========================================================
// FOOD PARTNER ROUTES
// =========================================================

// Get logged-in food partner's orders
// GET /order/api/partner
router.get(
  "/partner",
  authFoodPartnerMiddleware,
  getFoodPartnerOrders
);


// Update order status
// PATCH /order/api/:orderId/status
router.patch(
  "/:orderId/status",
  authFoodPartnerMiddleware,
  updateOrderStatus
);


export default router;
