import express from "express";
import {registeruser,loginuser} from "../controllers/controller.js";
const router=express();
router.post("/registerstudent",registeruser);
router.post("/loginuser",loginuser);
export default router;