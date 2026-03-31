import { registerUser , loginUser } from "../controllers/auth.controllers.js";
import express from "express";
const router = express.Router();

router.post("/signin", registerUser);
router.post("/login", loginUser);

export default router