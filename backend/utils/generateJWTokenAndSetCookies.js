import jwt from 'jsonwebtoken'


const generateJWTokenAndSetCookies =  (userId , res)=>{

    try {
        
        const token =  jwt.sign({userId} , process.env.JWT_SECRET,{expiresIn : "15d"})
    
        res.cookie("token" , token , {
            maxAge : 15*24*60*60*1000 ,//15d
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.MODE !== "development"
    
        })

    } catch (error) {
        res.status(402).json({
            Message : "Error in generating a JWT token",
            Error : error.message

        })
        
    }
}

export default generateJWTokenAndSetCookies