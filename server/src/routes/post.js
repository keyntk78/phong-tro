import express from 'express'
import { postController } from '../controller'
import { verifyToken } from '../middleware/index'

const router = express.Router()

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPaginationPosts)
router.get('/new-post', postController.getNewPosts)

router.use(verifyToken.verifyToken)
router.post('/create-post', postController.createNewPost)
router.get('/limit-admin', postController.getPaginationPostsAdmin)

export default router
