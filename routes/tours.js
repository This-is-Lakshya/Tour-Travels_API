import express from 'express';
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// create new Tour
router.post('/', verifyAdmin, createTour);

// update new Tour
router.put('/:id', verifyAdmin, updateTour);

// delete new Tour
router.delete('/:id', verifyAdmin, deleteTour);

// get Single Tour
router.get('/:id', getSingleTour);

// get All Tour
router.get('/', getAllTour);

// get Tour by search
router.get('/search/getTourBySearch', getTourBySearch);

// get featured Tour
router.get('/search/getFeaturedTour', getFeaturedTour);

// get Tour Count
router.get('/search/getTourCount', getTourCount);


export default router;