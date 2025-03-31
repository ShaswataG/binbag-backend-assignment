import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(`Incoming request to: ${req.method} ${req.path}`);
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.all("*", (req, res, next) => {
    res.send("Invalid endpoint")
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

(async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to database");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Error connecting to database:", err);
        process.exit(1);
    }
})();
