import Booking from "../models/Booking.js"

// create New booking
export const createBooking = async(req, res)=>{
    const newBooking = new Booking(req.body)
    
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({
            success:true,
            message:'Booked Successfully!',
            data:savedBooking
        });
        
    } catch (err) {
        res.status(200).json({
            success:true,
            message:'internal server error!'
        });
    }
};

// get Single booking
export const getBooking = async(req, res)=>{
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);
        res.status(200).json({
            success:true,
            message:'Successfully found!',
            data:book
        });

    } catch (err) {
        res.status(404).json({
            success:true,
            message:'Not found!'
        });
    }
};

// get ALl booking
export const getAllBooking = async(req, res)=>{

    try {
        const books = await Booking.find();
        res.status(200).json({
            success:true,
            message:'Successfully found!',
            data:books
        });

    } catch (err) {
        res.status(500).json({
            success:true,
            message:'internal server error!'
        });
    }
};