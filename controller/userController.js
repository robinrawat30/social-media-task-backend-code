import multer from "multer";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

import ErrorHandler from "../middlewares/error.js";


import { User } from "../models/userSchema.js";

import { v2 as cloudinary } from "cloudinary";





// function to submit the user details
export const submitUser = catchAsyncErrors(async (req, res, next) => {


    // to handle user image on cloudinary

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Choose a Image ", 400));
    }





    const { userImage } = req.files;



    const cloudinaryResponseForImage = await cloudinary.uploader.upload(
        userImage.tempFilePath,
        { folder: "IMAGES" }
    )



    if (!cloudinaryResponseForImage || cloudinaryResponseForImage.error) {
        console.error("Cloudinary Error", cloudinaryResponseForImage.error || "Unknown cloundinary error");
    }


    // to handle username and social media handle



    const { userName, socialMediaHandle } = req.body;




    if (!userName || !socialMediaHandle) {
        return next(new ErrorHandler("Please Fill Full Form !", 400));
    }

    const data = await User.create({
        userName,
        socialMediaHandle,
        userImage: {
            public_id: cloudinaryResponseForImage.public_id,
            url: cloudinaryResponseForImage.secure_url,
        }

    });
    res.status(200).json({
        success: true,
        message: "Submit Successfully",
        data,
    })
});


// function to get all user data 

export const getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
});


// function to get single user data


export const getSingleUser = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("project not found ! ", 400))
    }

    res.status(200).json({
        success: true,
        user
    })


})