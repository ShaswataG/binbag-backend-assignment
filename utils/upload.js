import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (buffer, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            // If the user already has a profile picture, delete it first
            if (user.profilePicture) {
                const oldPublicId = user.profilePicture.split("/").pop().split(".")[0]; // Extract public ID
                console.log("Deleting old profile picture:", oldPublicId);
                
                await cloudinary.uploader.destroy(`user_profiles/${oldPublicId}`, (error, result) => {
                    if (error) console.error("Cloudinary deletion error:", error);
                    else console.log("Old image deleted:", result);
                });
            }

            // Upload new image
            const stream = cloudinary.uploader.upload_stream(
                { folder: "user_profiles", public_id: `${user.name}-${Date.now()}`, overwrite: true },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(new ErrorHandler(500, "Error uploading image"));
                    } else {
                        resolve(result.secure_url);
                    }
                }
            );
            stream.end(buffer);
        } catch (error) {
            reject(new ErrorHandler(500, "Unexpected error in Cloudinary upload"));
        }
    });
};