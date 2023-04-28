import actionType from './actionType'
import * as service from '../../services'

export const getPosts = () => async (dispatch) => {
  try {
    const response = await service.apiGetPosts

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

export const getPaginationPosts = (query) => async (dispatch) => {
  try {
    const response = await service.apiGetPaginationPosts(query)

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_POSTS_PAGINATION,
        posts: response.data.response?.rows,
        count: response.data.response?.count
      })
    } else {
      dispatch({
        type: actionType.GET_POSTS_PAGINATION,
        msg: response.data.msg,
        posts: null
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POSTS_PAGINATION,
      posts: null
    })
  }
}

export const getNewPosts = () => async (dispatch) => {
  try {
    const response = await service.apiGetNewPosts()

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_NEW_POSTS,
        newPosts: response.data.response
      })
    } else {
      dispatch({
        type: actionType.GET_NEW_POSTS,
        msg: response.data.msg,
        newPosts: null
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_NEW_POSTS,
      newPosts: null
    })
  }
}
