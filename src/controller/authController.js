import {userModel} from '../models/userModel.js'
import bcryptjs from 'bcryptjs'

import jwt from 'jsonwebtoken'
import foodPartnerModel from '../models/foodpartner.model.js';

// register user

async function registerUser(req,res) {
    const {name , email , password} = req.body;
    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already Exists"
        })
    }
    const hasPassword = await bcryptjs.hash(password,10)

    const user = await userModel.create({
        name, email , password: hasPassword
    })
    const token = jwt.sign(
        {
            id:user._id,
            
        },process.env.Jwt_secret) 

    res.cookie('token',token)
    
    res.status(201).json({
        message:"user registerd",
        user:{
            _id:user._id,
            email:user.email,
            name: user.name
        }
    })
}



// login user
async function loginUser(req,res) {
    const {email,password} = req.body
    const user = await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcryptjs.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token = jwt.sign({
        id : user._id

    },process.env.Jwt_secret)
    const cookies = res.cookie('token',token)
    res.status(201).json({
        message:"user registerd",
        user:{
            _id:user._id,
            email:user.email,
            name: user.name
        }
    })    
}


// logout User
async function logOutUser(req,res) {
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })
}


// Register food partner
async function registerFoodPatner(req, res) {

  const {
    shopName,
    ownerName,
    contactNumber,
    email,
    password,
    address
  } = req.body;

  const isAccountExist = await foodPartnerModel.findOne({
    email
  });

  if (isAccountExist) {
    return res.status(400).json({
      message: "Food partner already exists, return to login page"
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    shopName,
    ownerName,
    contactNumber,
    email,
    password: hashedPassword,
    address
  });

  console.log("FOOD PARTNER CREATED:", foodPartner);
  console.log("DATABASE:", foodPartnerModel.db.name);
  console.log("COLLECTION:", foodPartnerModel.collection.name);

  const token = jwt.sign(
    {
      id: foodPartner._id
    },
    process.env.Jwt_secret,
    {
      expiresIn: "7d"
    }
  );

  res.cookie("foodPartnerToken", token);

  return res.status(201).json({
    message: "Food Partner registered successfully"
  });
}

// Login food Partner
async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const validateUser = await foodPartnerModel.findOne({
        email
    });

    if (!validateUser) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcryptjs.compare(
        password,
        validateUser.password
    );

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        {
            id: validateUser._id
        },
        process.env.Jwt_secret
    );

    res.cookie("foodPartnerToken", token);

    return res.status(200).json({
        message: "Login successful"
    });
}



// LogOut food partner
async function logOutFoodPartner(req,res) {
    res.clearCookie("foodPartnerToken")
    res.status(200).json({
        message:"FoodPartner logout sucessfull"
    })
}


const getFoodPartnerProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      foodPartner: {
        _id: req.foodPartner._id,
        shopName: req.foodPartner.shopName,
        ownerName: req.foodPartner.ownerName,
        contactNumber: req.foodPartner.contactNumber,
        email: req.foodPartner.email,
        address: req.foodPartner.address,
      },
    });
  } catch (error) {
    console.log("Profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  registerUser,
  loginUser,
  logOutUser,
  registerFoodPatner,
  loginFoodPartner,
  logOutFoodPartner,
  getFoodPartnerProfile,
};