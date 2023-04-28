import express from 'express'
import { userController } from '../controller'
import { verifyToken } from '../middleware/index'

const router = express.Router()

router.get('/get-current', verifyToken.verifyToken, userController.getCurrentUser)

export default router
