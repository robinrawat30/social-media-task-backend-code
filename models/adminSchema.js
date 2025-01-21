import mongoose from "mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    adminName:{
        type:String,
        minLength:[2,"Must Contain at least 2 characters! "],
    },

    password:{
        type:String,
        required:[true,"Password is Required!"],
        minLength:[8,"Password munst contain at least 8 character!"],
        select:false,
    }

   
});


// for hashing password
adminSchema.pre("save",async function (next) {

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
    
});

// for comparing password with hash password

adminSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword,this.password);
    
}

// generate json web token 

adminSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
}



export const Admin = mongoose.model("Admin",adminSchema);