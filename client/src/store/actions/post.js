import actionType from './actionType'
import { apiGetPosts, apiGetPaginationPosts } from './../../services/post'

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts()

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_POSTS,
        posts: response.data.response
      })
    } else {
      dispatch({
        type: actionType.GET_POSTS,
        msg: response.data.msg
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POSTS,
      posts: null
    })
  }
}

export const getPaginationPosts = (page) => async (dispatch) => {
  try {
    const response = await apiGetPaginationPosts(page)

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_POSTS_PAGINATION,
        posts: response.data.response?.rows,
        count: response.data.response?.count
      })
    } else {
      dispatch({
        type: actionType.GET_POSTS_PAGINATION,
        msg: response.data.msg
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POSTS_PAGINATION,
      posts: null
    })
  }
}
