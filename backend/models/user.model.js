import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type :String,
        require : true,
        unique:true
    },
    fullName : {
        type :String,
        require : true,
    },
    username : {
        type :String,
        require : true,
        unique : true
    },
    password : {
        type :String,
        require : true,
        minlength : 6
    },
    gender : {
        type : String,
        required : true ,
        enum :["male","female"]
    },
    profilePic : {
        type : String,
        default : ""
    }
    

},{timestamps : true})

const User = mongoose.model("User" ,userSchema )

export default User