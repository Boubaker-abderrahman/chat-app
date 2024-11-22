import authRouter from './Routes/auth.route.js'
import connectDb from './db/connectDb.js'
import dotenv from 'dotenv'
import messageRoute from './Routes/message.route.js'
import userRoute from './Routes/user.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './socket/socket.js'
import express from "express";
import path  from 'path';

const PORT =process.env.PORT || 5000
const __dirname = path.resolve()

dotenv.config()

app.use(express.json())
app.use(cookieParser())



app.use('/api/auth' , authRouter)
app.use('/api/messages' , messageRoute)
app.use('/api/users' , userRoute)

app.use(express.static(path.join(__dirname,"frontend/dist")))

app.get("*" , (req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT, ()=>{
    connectDb()
    console.log('listening on port ',PORT)
} )