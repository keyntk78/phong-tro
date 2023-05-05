import actionType from '../actions/actionType'

const initState = {
  posts: [],
  msg: '',
  count: 0,
  newPosts: [],
  postOfCurrent: [],
  dataEdit: null,
  postDetail: []
}

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_POSTS:
    case actionType.GET_POSTS_PAGINATION:
      return { ...state, posts: action.posts || [], msg: action.msg || '', count: action.count || 0 }
    case actionType.GET_POSTS_ADMIN:
      return { ...state, postOfCurrent: action.posts || [], msg: action.msg || '' }
    case actionType.DETAIL_POST:
      return { ...state, postDetail: action.postDetail || [], msg: action.msg || '' }
    case actionType.GET_NEW_POSTS:
      return { ...state, newPosts: action.newPosts || [], msg: action.msg || '' }
    case actionType.EDIT_DATA_POST:
      return { ...state, dataEdit: action.dataEdit || '' }
    case actionType.RESET_DATAEDIT_POST:
      return { ...state, dataEdit: null || '' }
    default:
      return state
  }
}

export default postReducer
