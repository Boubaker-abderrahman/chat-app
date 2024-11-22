import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import generateJWTokenAndSetCookies from "../utils/generateJWTokenAndSetCookies.js"
import jwt from 'jsonwebtoken'

const signup = async (req,res)=>{
    const {email,fullName,username,password,confirmedPass,gender,profilePic}=req.body

    try {
        if(!email || !fullName || !username || !password || !confirmedPass || !gender){
            throw new Error('All Field are Required')
        }

        if(password !== confirmedPass){throw new Error('Not Confirmed Password')}

        const user = await User.findOne({username,email})

        if(user){throw new Error('Email or Username already Used')}

        const salt = await bcryptjs.genSalt(10)
        const hashedPass = await bcryptjs.hash(password , salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl`;


        const newUser = {email,
                        fullName,
                        username,
                        password : hashedPass,
                        gender,
                        profilePic : !profilePic & gender ==="male" ? boyProfilePic : girlProfilePic }

        const response = await User.create(newUser)

        if(!response){throw new Error('User Creation Failed')}

        generateJWTokenAndSetCookies(response._id,res)

        res.status(200).json({id : response._id ,email , fullName , username ,profilePic : response.profilePic })
        
        
    } catch (error) {
        res.status(400).json({Message : "Error in SignUp controller" , error : error.message})
    }
}
const login = async (req,res)=>{
    const {username,password} = req.body

    try {

        if(!username || !password){return res.status(401).json({message :"All Field required" })}
        
        const user = await User.findOne({username})
        
        if(!user){return res.status(401).json({message :"User Not Found" })}
        

        const passMatch = await bcryptjs.compare(password , user?.password || "")

        if(!passMatch){return res.status(401).json({message :"Invalid Credential" })}

        generateJWTokenAndSetCookies(user._id , res)


        res.status(200).json({ message: "Login successful" , user : {...user._doc ,password : undefined}});
    } catch (error) {
        res.status(500).json({Message : "Internal Error in LogIn controller" , error : error.message})

        
    }
}
const logout = (req,res)=>{
    
    try {
		return res.clearCookie("token").status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}

}

const checkauth = async (req,res)=>{

    const token = req.cookies.token

    try {
        if(!token){return res.status(401).json({message : 'No token Given'})}
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        if(!decoded){ return res.status(401).json({message : 'Invalid or Expired token'})}

        const user = await User.findById(decoded.userId).select("-password");
        res.status(200).json(user)

        
    } catch (error) {
        res.status(500).json({message : "Internal Error In Token Verification" , error :error.message})
        
    }

    
}



const authControllers = {
    signup,
    login,
    logout,
    checkauth
}

export default authControllers