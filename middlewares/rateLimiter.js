import rateLimit from"express-rate-limit";
export const urllimiter=rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:{error:"bohot zaada request bhej di hainn,15 min baad try karein"}
});
