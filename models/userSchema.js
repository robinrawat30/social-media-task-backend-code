import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        minLength:[2,"Must Contain at least 2 characters! "],
    },

    socialMediaHandle:{

        type:String,
        minLength:[2,"Must Contain at least 2 characters! "],
       

    },

    userImage:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },


    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

export const User = mongoose.model("User",userSchema);