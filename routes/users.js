import express from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// update new User
router.put('/:id', verifyUser, updateUser);

// delete new User
router.delete('/:id', verifyUser, deleteUser);

// get Single User
router.get('/:id', verifyUser, getSingleUser);

// get All User
router.get('/', verifyAdmin, getAllUser);


export default router;