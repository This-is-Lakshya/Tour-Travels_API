import Tour from '../models/Tour.js';

// create new tour
export const createTour = async (req,res)=>{
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(200).json({
            success:true,
            message:'Successfully Created',
            data:savedTour
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to Create!'
        });
    }
}

// update tour
export const updateTour = async(req,res)=>{

    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true});

        res.status(200).json({
            success:true,
            message:'Successfully Updated',
            data:updatedTour
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to Update!'
        });
    }
}

// delete tour
export const deleteTour = async(req,res)=>{
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);

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

// get Single tour
export const getSingleTour = async(req,res)=>{

    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate('reviews');

        res.status(200).json({
            success:true,
            message:'Found Successfully!',
            data:tour
        });

    } catch (err) {
        res.status(404).json({
            success:false,
            message:'Not Found!'
        });
    }
}

// get All tour
export const getAllTour = async(req,res)=>{

    // for Pagination
    const page = parseInt(req.query.page);
    console.log(page);

    try {
        const tours = await Tour.find().populate('reviews').skip(page * 8).limit(8);

        res.status(200).json({
            success:true,
            count:tours.length,
            message:"Found Successfully!",
            data:tours
        });
    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Not Found!"
        });
    }
};

// get tour by search
export const getTourBySearch = async(req, res)=>{

    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        
        const tours = await Tour.find({
            city,
            distance:{$gte:distance},
            maxGroupSize:{$gte:maxGroupSize}
        }).populate('reviews');
        
        res.status(200).json({
            success:true,
            message:"Found Successfully!",
            data:tours
        });

    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Not Found!"
        });  
    }
    
};

// get featured tour
export const getFeaturedTour = async(req,res)=>{

    try {
        const tours = await Tour.find({featured:true}).populate('reviews').limit(8);

        res.status(200).json({
            success:true,
            message:"Found Successfully!",
            data:tours
        });
    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Not Found!"
        });
    }
};

// get Tour Count
export const getTourCount = async(req, res)=>{
    try {
        const tourCount = await Tour.estimatedDocumentCount();

        res.status(200).json({
            success:true,
            data:tourCount
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:"failed to count!"
        });
    }
}