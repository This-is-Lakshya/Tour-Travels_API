import Tour from "../models/Tour.js";
import Hotel from "../models/Hotel.js";
import Review from "../models/Review.js";

export const createReview = async(req, res)=>{

    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body });

    try {
        const savedReview = await newReview.save();

        // after creating, update 
        await Tour.findByIdAndUpdate(tourId, {
            $push: {reviews: savedReview._id}
        });

        res.status(200).json({
            success:true,
            message:'Review Submitted!',
            data:savedReview
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to Submit!'
        });
    }
};

export const createHotelReview = async(req, res)=>{

    const hotelId = req.params.hotelId;
    const newReview = new Review({ ...req.body });

    try {
        const savedReview = await newReview.save();

        // after creating, update 
        await Hotel.findByIdAndUpdate(hotelId, {
            $push: {reviews: savedReview._id}
        });

        res.status(200).json({
            success:true,
            message:'Review Submitted!',
            data:savedReview
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to Submit!'
        });
    }
};