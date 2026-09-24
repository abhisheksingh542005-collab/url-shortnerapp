import express from "express";
import {handleGenerateShortUrl,handleRedirectUrl}from"../controller/url.js";
import {validateurl} from"../utils/validator.js";
import {verifytoken} from"../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/shorten",  handleGenerateShortUrl);
router.get("/:shortid",handleRedirectUrl);

export default router;

