import Hotel from '../models/Hotel.js';

// create new hotel
export const createHotel = async (req,res)=>{
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();

        res.status(200).json({
            success:true,
            message:'Successfully Created',
            data:savedHotel
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to Create!'
        });
    }
}

// update hotel
export const updateHotel = async(req,res)=>{

    const id = req.params.id;

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true});

        res.status(200).json({
            success:true,
            message:'Successfully Updated',
            data:updatedHotel
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to Update!'
        });
    }
}

// delete hotel
export const deleteHotel = async(req,res)=>{
    const id = req.params.id;

    try {
        await Hotel.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:'Deleted Successfully!'
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to Delete!'
        });
    }
}

// get Single hotel
export const getSingleHotel = async(req,res)=>{

    const id = req.params.id;

    try {
        const hotel = await Hotel.findById(id).populate('reviews');

        res.status(200).json({
            success:true,
            message:'Found Successfully!',
            data:hotel
        });

    } catch (err) {
        res.status(404).json({
            success:false,
            message:'Not Found!'
        });
    }
}

// get All hotel
export const getAllHotel = async(req,res)=>{

    // for Pagination
    const page = parseInt(req.query.page);
    console.log(page);

    try {
        const hotels = await Hotel.find().populate('reviews').skip(page * 8).limit(8);

        res.status(200).json({
            success:true,
            count:hotels.length,
            message:"Found Successfully!",
            data:hotels
        });
    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Not Found!"
        });
    }
};

// get hotel by search
export const getHotelBySearch = async(req, res)=>{

    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        
        const hotels = await Hotel.find({
            city,
            distance:{$gte:distance},
            maxGroupSize:{$gte:maxGroupSize}
        }).populate('reviews');
        
        res.status(200).json({
            success:true,
            message:"Found Successfully!",
            data:hotels
        });

    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Not Found!"
        });  
    }
    
};

// get featured hotel
export const getFeaturedHotel = async(req,res)=>{

    try {
        const hotels = await Hotel.find({featured:true}).populate('reviews').limit(8);

        res.status(200).json({
            success:true,
            message:"Found Successfully!",
            data:hotels
        });
    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Not Found!"
        });
    }
};

// get Hotel Count
export const getHotelCount = async(req, res)=>{
    try {
        const hotelCount = await Hotel.estimatedDocumentCount();

        res.status(200).json({
            success:true,
            data:hotelCount
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:"failed to count!"
        });
    }
}