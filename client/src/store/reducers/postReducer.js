import actionType from '../actions/actionType'

const initState = {
  posts: [],
  msg: '',
  count: 0
}

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_POSTS:
    case actionType.GET_POSTS_PAGINATION:
      return { ...state, posts: action.posts, msg: action.msg || '', count: action.count || 0 }

    default:
      return state
  }
}

export default postReducer
