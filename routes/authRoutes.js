import express from 'express';
import { signup, signin, logout } from '../controllers/authController.js';

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").post(logout);

export default router;