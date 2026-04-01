import {
  registerUser,
  loginUser,
  verifyOtp,
} from '../controllers/auth.controllers.js';
import express from 'express';
const router = express.Router();

router.post('/signin', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOtp);

export default router;
