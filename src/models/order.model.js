import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // User who placed the order
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    // Food item being ordered
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fooditemModel",
      required: true,
    },

    // Food partner / restaurant receiving the order
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodPartnerModel",
      required: true,
    },

    // Number of items
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    // Delivery information
    deliveryAddress: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    // Total price of the order
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Order status
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model(
  "orderModel",
  orderSchema
);

export default orderModel;