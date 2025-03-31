import express from 'express';
import { verifyUserToken } from '../middlewares/authMiddleware.js';
import { getUserProfile, updateProfile } from '../controllers/userController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.route('/profile').get(verifyUserToken, getUserProfile).put(verifyUserToken, verifyUserToken, upload.single('profilePicture'), updateProfile);

export default router;