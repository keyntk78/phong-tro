import express from 'express'
import * as categoryController from '../controller/category'

const router = express.Router()

router.get('/all', categoryController.getAllCategories)

export default router
