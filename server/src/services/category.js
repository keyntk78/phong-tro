import db from '../models'

// Get all Categories
export const getAllCategoriesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({ raw: true, attributes: ['code', 'value'] })

      resolve({
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get categores',
        response
      })
    } catch (error) {
      reject(error)
    }
  })
