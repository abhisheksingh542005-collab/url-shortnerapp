import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const savedUser = await new User({ 
            email, 
            password: hashedPassword 
        }).save();

        return res.status(201).json({ 
            message: "successfull user registered", 
            UserId: savedUser._id 
        });

    } catch (error) {
        console.log("Exact Error:", error);
        return res.status(500).json({ error: "server error" });
    }
};

//login logic
// Login Logic
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // 2. Compare password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // 3. Generate JWT Token (Make sure you have JWT_SECRET in your env or replace it with a secret string)
        const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.JWT_SECRET || "your_jwt_secret_key", 
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Logged in successfully",
            token: token,
            userId: user._id
        });

    } catch (error) {
        console.log("Exact Error:", error);
        return res.status(500).json({ error: "server error" });
    }
};
