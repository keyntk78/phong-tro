import actionType from './actionType'
import { apiGetCategories } from './../../services/category'
import { apiGetPrices } from '../../services/price'
import { apiGetAreas } from '../../services/area'

export const getCategories = () => async (dispatch) => {
  try {
    const response = await apiGetCategories()

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
    const response = await apiGetPrices()

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
    const response = await apiGetAreas()

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
