import express from "express";
import { getAllUser, getSingleUser, submitUser } from "../controller/userController.js";



const router = express.Router();



router.post("/submit",submitUser);
router.get("/all",getAllUser);
router.get("/:id",getSingleUser);


export default router ;