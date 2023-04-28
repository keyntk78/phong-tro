import actionType from './actionType'

import * as service from './../../services'

export const register = (payload) => async (dispatch) => {
  try {
    const response = await service.apiRegister(payload)

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.REGISTER_SUCCESS,
        data: response.data.token
      })
    } else {
      dispatch({
        type: actionType.REGISTER_FAIL,
        data: response.data.msg
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.REGISTER_FAIL,
      data: null
    })
  }
}

export const login = (payload) => async (dispatch) => {
  try {
    const response = await service.apiLogin(payload)

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.LOGIN_SUCCESS,
        data: response.data.token
      })
    } else {
      dispatch({
        type: actionType.LOGIN_FAIL,
        data: response.data.msg
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.LOGIN_FAIL,
      data: null
    })
  }
}

export const logout = (dispatch) => dispatch({ type: actionType.LOGOUT })
