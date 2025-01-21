import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js"

import { Admin } from "../models/adminSchema.js";
import { generateToken } from "../utils/jwtToken.js";




// function to register admin

export const register = catchAsyncErrors(async(req,res,next)=>{

    const {adminName, password} = req.body;

    const admin = await Admin.create({adminName,password});

    generateToken(admin, "admin registered succesfully ", 201, res);

});

// function to login admin

export const login = catchAsyncErrors(async (req, res, next) => {

    const { adminName, password } = req.body;

    if (!adminName || !password) {
        return next(new ErrorHandler("Name and password are required !"))


    }

    const admin = await Admin.findOne({ adminName }).select("+password");

    if (!adminName) {
        return next(new ErrorHandler("Name or password are invalid !"))
    }

    const isPasswordMatch = await admin.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Name or password invalid !"))
    }

    generateToken(admin, "Amdin login successfully ", 200, res);
})


// function to logout admin

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true


    }).json({
        success: true,
        message: "logout successfully",
    })
})
