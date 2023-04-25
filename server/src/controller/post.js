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
  const { page, ...query } = req.query

  try {
    const response = await postService.getPostsPaginationService(page, query)

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

export default {
  getPaginationPosts,
  getPosts,
  getNewPosts
}
