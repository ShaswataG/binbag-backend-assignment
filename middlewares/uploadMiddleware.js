import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory before upload

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    }
});

export default upload;
