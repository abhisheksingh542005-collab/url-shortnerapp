import Url from "../models/url.js";
import { nanoid } from "nanoid";
import connectToMongo from "../Config/db.js";

export const handleGenerateShortUrl = async (req, res) => {
    try {
        await connectToMongo();
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ error: "URL is required" });
        }

        const shortid = nanoid(6);

        const newUrl = await Url.create({
            originalUrl: originalUrl,
            shortid: shortid,
            user: req.user ? req.user.userId : undefined,
        });

        return res.status(201).json({
            id: shortid,
            shortUrl: `${process.env.BASE_URL || "https://url-shortnerapp.vercel.app"}/api/v1/url/${shortid}`,
            data: newUrl
        });

    } catch (error) {
        console.log("Controller Error:", error);
        return res.status(500).json({ error: "server error", details: error.message });
    }
};

// 2. Redirect to Original URL (GET)
export const handleRedirectUrl = async (req, res) => {
    try {
        const shortid = req.params.shortid; // Route se shortid nikali
        
        // Database mein dhoondo ki yeh shortid kiske pas hai
        const entry = await Url.findOne({ shortid });

        if (!entry) {
            return res.status(404).json({ error: "URL nahi mila bhai!" });
        }

        // Asli URL par redirect kar do
        return res.redirect(entry.originalUrl);
    } catch (error) {
        console.error("Redirect Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



