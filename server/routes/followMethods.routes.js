import { followUser } from '../controllers/followers.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/follow/:id', authMiddleware, followUser);

export default router;
