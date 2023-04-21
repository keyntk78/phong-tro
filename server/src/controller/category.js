import * as services from '../services/category'

export const getAllCategories = async (req, res) => {
  try {
    const response = await services.getAllCategoriesService()

    res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at category controller: ' + error
    })
  }
}
