import User from "../models/User.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { sendUserPasswordResetEmail } from "../helpers/mail/authMail.js";

export const signup = async (req, res, next) => {
    try {
        const { name, email, address, password } = req.body;

        if (!name || !email || !address || !password) {
            return next(new ErrorHandler(400, "All fields are required"));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler(400, "User already exists"));
        }

        const user = await User.create({ name, email, address, password });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("user_access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: { 
                    id: user._id, 
                    name, 
                    email, 
                    address,
                },
            }
        });
    } catch (error) {
        next(error);
    }
};


export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler(400, "Email and password are required"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler(404, "Email not found"));
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new ErrorHandler(401, "Invalid credentials"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("user_access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: { 
                    id: user._id, 
                    name: user.name, 
                    email: user.email, 
                    is_verified: user.is_verified,
                    address: user.address 
                },
            }
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const userToken = req.cookies.user_access_token;

        if (!userToken) {
            return next(new ErrorHandler(400, "No active session found"));
        }
        res.clearCookie("user_access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict" 
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
            data: {}
        });
    } catch (error) {
        next(error);
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email: email
        });
        
        if (!user) {
            return next(new ErrorHandler(404, "No account found with this email"));
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        await User.findByIdAndUpdate(user._id, {
            resetPasswordToken: resetToken,
            resetPasswordExpire: Date.now() + 24 * 3600000
        })

        await sendUserPasswordResetEmail(user.email, resetToken);

        res.status(200).json({
            success: true,
            message: "Password reset link sent to email",
            data: {}
        })
    } catch (error) {
        next(error)
    }
}