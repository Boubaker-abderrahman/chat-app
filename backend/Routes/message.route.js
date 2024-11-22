import express from 'express'
import protectedRoute from '../middelware/protectedRoute.js'
import messageControllers from '../controllers/message.controller.js'

const messageRoute = express.Router()

const {getMessages, sendMessage} = messageControllers

messageRoute.get('/:id', protectedRoute , getMessages)
messageRoute.post('/send/:id', protectedRoute , sendMessage)

export default messageRoute