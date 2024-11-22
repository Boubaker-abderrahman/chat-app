import User from "../models/user.model.js"

const getUserForSidebar = async (req,res)=>{
    const loggedInUserId = req.user._id

    try {
        const users = await User.find({ _id : {$ne: loggedInUserId}}).select('-password')
        res.status(200).json({message : "getUserForSidebar success",users})
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "Error in Getting User for Sidebar" , error : error.message})

        
    }

}

export default getUserForSidebar