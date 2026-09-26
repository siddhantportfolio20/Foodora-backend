import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true
  },

  ownerName: {
    type: String,
    required: true
  },

  contactNumber: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  }
});

const foodPartnerModel = mongoose.model(
  "foodPartnerModel",
  foodPartnerSchema
);

export default foodPartnerModel;