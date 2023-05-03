import { postService } from '../services'

const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService()

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at got controller: ' + error
    })
  }
}

const getPaginationPosts = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query

  try {
    const response = await postService.getPostsPaginationService(page, query, { priceNumber, areaNumber })

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at got controller: ' + error
    })
  }
}

const getPaginationPostsAdmin = async (req, res) => {
  const { page, ...query } = req.query
  const { id } = req.user

  try {
    if (!id) return res.status(400).json({ err: 1, msg: 'Missing input' })
    const response = await postService.getPostsPaginationAdminService(page, query, id)

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at got controller: ' + error
    })
  }
}

const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostsService()

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at got controller: ' + error
    })
  }
}

const createNewPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, areaNumber, label, ...payload } = req.body
    const { id } = req.user

    if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label) {
      return res.status(400).json({ err: 1, msg: 'Missing Input' })
    }

    const response = await postService.createNewPostService(req.body, id)

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at got controller: ' + error
    })
  }
}

export default {
  getPaginationPosts,
  getPosts,
  getNewPosts,
  createNewPost,
  getPaginationPostsAdmin
}
