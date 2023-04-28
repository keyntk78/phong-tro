import db from '../models'

// Get Current
export const getCurrentUserService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ['password']
        }
      })

      resolve({
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get price',
        response
      })
    } catch (error) {
      reject(error)
    }
  })

export default {
  getCurrentUserService
}
