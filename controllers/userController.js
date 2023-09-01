import User from '../models/User.js';

// create new User
export const createUser = async (req,res)=>{
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({
            success:true,
            message:'Successfully Created',
            data:savedUser
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to Create!'
        });
    }
}

// update user
export const updateUser = async(req,res)=>{

    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true});

        res.status(200).json({
            success:true,
            message:'Successfully Updated',
            data:updatedUser
        });

    } catch (err) {
        res.status(500).json({
            success:false,
            message:'Failed to Update!'
        });
    }
}

// delete User
export const deleteUser = async(req,res)=>{
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

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

// get single User
export const getSingleUser = async(req,res)=>{

    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json({
            success:true,
            message:'Found Successfully!',
            data:user
        });

    } catch (err) {
        res.status(404).json({
            success:false,
            message:'Not Found!'
        });
    }
}

// get All Users
export const getAllUser = async(req,res)=>{

    try {
        const users = await User.find();

        res.status(200).json({
            success:true,
            message:"Found Successfully!",
            data:users
        });
    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Not Found!"
        });
    }
};