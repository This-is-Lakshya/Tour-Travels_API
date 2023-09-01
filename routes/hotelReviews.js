import express from "express";
import { createHotelReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post('/:hotelId', createHotelReview);

export default router;