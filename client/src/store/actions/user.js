import actionType from './actionType'

import * as service from '../../services'

export const getCurrentUser = () => async (dispatch) => {
  try {
    const response = await service.apiGetCurentUser()

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CURRENT_USER,
        currentData: response.data.response
      })
    } else {
      dispatch({
        type: actionType.GET_CURRENT_USER,
        msg: response.data.msg,
        currentData: null
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CURRENT_USER,
      currentData: null,
      msg: error
    })
  }
}
