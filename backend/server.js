import authRouter from './Routes/auth.route.js'
import connectDb from './db/connectDb.js'
import dotenv from 'dotenv'
import messageRoute from './Routes/message.route.js'
import userRoute from './Routes/user.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './socket/socket.js'
import express from "express";


dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin : "http://localhost:5173" , credentials : true}));


app.use('/api/auth' , authRouter)
app.use('/api/messages' , messageRoute)
app.use('/api/users' , userRoute)


server.listen(5000, ()=>{
    connectDb()
    console.log('listening on port 5000')
} )