import actionType from './actionType'

import * as service from '../../services'

export const getCategories = () => async (dispatch) => {
  try {
    const response = await service.apiGetCategories()

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CATEGORIES,
        categories: response.data.response
      })
    } else {
      dispatch({
        type: actionType.GET_CATEGORIES,
        msg: response.data.msg,
        categories: null
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CATEGORIES,
      categories: null
    })
  }
}

export const getPrices = () => async (dispatch) => {
  try {
    const response = await service.apiGetPrices()

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRICES,
        prices: response.data.response
      })
    } else {
      dispatch({
        type: actionType.GET_PRICES,
        msg: response.data.msg,
        prices: null
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRICES,
      prices: null
    })
  }
}

export const getAreas = () => async (dispatch) => {
  try {
    const response = await service.apiGetAreas()

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_AREAS,
        areas: response.data.response
      })
    } else {
      dispatch({
        type: actionType.GET_AREAS,
        msg: response.data.msg,
        areas: null
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_AREAS,
      areas: null
    })
  }
}

export const getProvinces = () => async (dispatch) => {
  try {
    const response = await service.apiGetProvinces()

    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PROVINCES,
        provinces: response.data.response
      })
    } else {
      dispatch({
        type: actionType.GET_PROVINCES,
        msg: response.data.msg,
        provinces: null
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PROVINCES,
      provinces: null
    })
  }
}
