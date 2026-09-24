import jwt from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
