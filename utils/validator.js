import validator from "validator";

export const validateurl = (req, res, next) => {
    // Yahan hum teeno tarike ke naam check kar rahe hain taaki galti ki gunjaish na rahe
    const urlToValidate = req.body.originalUrl || req.body.originalurl || req.body.url;

    if (!urlToValidate) {
        return res.status(400).json({ error: "orizinal url zaroori hain" });
    }

    if (!validator.isURL(urlToValidate)) {
        return res.status(400).json({ error: "invalid url format" });
    }

    next();
};
