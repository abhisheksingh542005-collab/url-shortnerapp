import express from "express";
import cors from"cors";
import connectTomongo from"./config/db.js";
import authRoutes from"./routes/authRoutes.js";
import  urlRoutes from"./routes/urlRoutes.js";
import {urllimiter} from"./middlewares/rateLimiter.js";





const app=express();
connectTomongo();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port=7000;
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/url",urlRoutes);


app.listen(port,()=>{
    console.log('production-ready server is running on http://localhost:${port} ');
});







