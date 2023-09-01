import express from 'express';
import { createHotel, deleteHotel, getAllHotel, getFeaturedHotel, getSingleHotel, getHotelBySearch, getHotelCount, updateHotel } from '../controllers/hotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// create new Hotel
router.post('/', verifyAdmin, createHotel);

// update new Hotel
router.put('/:id', verifyAdmin, updateHotel);

// delete new Hotel
router.delete('/:id', verifyAdmin, deleteHotel);

// get Single Hotel
router.get('/:id', getSingleHotel);

// get All Hotel
router.get('/', getAllHotel);

// get Hotel by search
router.get('/search/getHotelBySearch', getHotelBySearch);

// get featured Hotel
router.get('/search/getFeaturedHotel', getFeaturedHotel);

// get Hotel Count
router.get('/search/getHotelCount', getHotelCount);


export default router;