import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/upload.js";

export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return next(new ErrorHandler(404, "User not found"));
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const { address, bio } = req.body;
        console.log('updateProfile');
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return next(new ErrorHandler(404, "User not found"));

        let updatedFields = {};

        if (req.file) {
            console.log("Uploading to Cloudinary...");
            updatedFields.profilePicture = await uploadToCloudinary(req.file.buffer, user);
            console.log("Uploaded Image URL:", updatedFields.profilePicture);
        }

        if (address) updatedFields.address = address;
        if (bio) updatedFields.bio = bio;
        console.log('updatedFields: ', updatedFields);
        const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedFields, {
            new: true,
            runValidators: true,
        }).select("-password");


        res.status(200).json({
            success: true,
            message: "Profile updated",
            data: {
                user: updatedUser
            }
        });
    } catch (error) {
        console.error(error);
        if (error.message.includes("File too large")) {
            return next(new ErrorHandler(400, "File size exceeds the 2MB limit"));
        }
        next(error);
    }
};
