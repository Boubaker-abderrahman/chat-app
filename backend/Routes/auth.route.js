
import express from 'express'
import authControllers from '../controllers/auth.controller.js'

const authRouter = express.Router()
const {signup , login , logout, checkauth} = authControllers

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/check-auth', checkauth)

export default authRouter


