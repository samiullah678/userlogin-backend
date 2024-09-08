import {checkconnect,myuser} from "./config/db.js";
checkconnect();
import express from "express";
import router from "./routers/router.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({path:".env"});
const port=process.env.PORT||3000;
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api',router);
app.listen(port,()=>{
    console.log('app is running on port ',port);
})