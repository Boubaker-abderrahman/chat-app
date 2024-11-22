
import express from 'express'
import protectedRoute from '../middelware/protectedRoute.js'
import getUserForSidebar from '../controllers/user.controller.js'


const userRoute = express.Router()

userRoute.get('/',protectedRoute, getUserForSidebar)

export default userRoute


