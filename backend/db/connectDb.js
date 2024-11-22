import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log('mongoDb connected successfully')
    } catch (error) {
        console.log('mongoDb connection failed' , error)
        
    }

}

export default connectDb
