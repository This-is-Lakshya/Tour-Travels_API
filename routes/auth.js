import express from "express";
import { login, register } from "../controllers/authController.js";


const router = express.Router();

// to register
router.post('/register', register);

// to login / signin
router.post('/login', login);

export default router;