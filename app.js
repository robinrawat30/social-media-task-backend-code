import express from 'express';

import dotenv from "dotenv";

import cors from "cors";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dbConnection from './database/dbConnection.js';

import {errorMidleware} from "./middlewares/error.js";

import userRouter from "./router/userRoutes.js";


import adminRouter from "./router/adminRoutes.js";





const app = express();

dotenv.config({ path: "./config/config.env" });

// using cors to link site and admin dashboard 
app.use(cors(
    {
        origin: [process.env.SITE_URL],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    }
))

// using cookie parser to generate cookie 

app.use(cookieParser());

// use express json to parse data 
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// file upload to work on files
app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: "/tmp/",
    }

))



// to user data
app.use("/api/v1/user",userRouter);

// to admin data

app.use("/api/v1/admin",adminRouter);




// to connected with database 
dbConnection();


// to use middleware 
app.use(errorMidleware);






export default app;