import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req,res,next)=>{
    const token = req.cookies.token

    try {
        if(!token){return res.status(401).json({message : 'No token Given'})}
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        if(!decoded){ return res.status(401).json({message : 'Invalid or Expired token'})}

        const user = await User.findById(decoded.userId).select("-password");
        req.user = user

        next()
    } catch (error) {
        res.status(500).json({message : "Internal Error In Token Verification" , error :error})
        
    }

    
}

export default protectedRoute