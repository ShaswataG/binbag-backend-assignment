import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";

export const verifyUserToken = (req, res, next) => {
    const token = req.cookies.user_access_token;

    if (!token) {
        return next(new ErrorHandler(401, "Access denied. No token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(new ErrorHandler(403, "Invalid or expired token"));
    }
};