import actionType from '../actions/actionType'

const initState = {
  currentData: {},
  msg: ''
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CURRENT_USER:
      return { ...state, currentData: action.currentData || {} }
    case actionType.LOGOUT:
      return {
        ...state,
        currentData: {}
      }
    default:
      return state
  }
}

export default userReducer
