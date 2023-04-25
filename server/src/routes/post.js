import express from 'express'
import { postController } from '../controller'

const router = express.Router()

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPaginationPosts)
router.get('/new-post', postController.getNewPosts)

export default router
