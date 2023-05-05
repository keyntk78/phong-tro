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

export const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(payload, { where: { id: id } })

      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? 'Updated' : 'Failed to update user',
        response
      })
    } catch (error) {
      reject(error)
    }
  })

export default {
  getCurrentUserService,
  updateUser
}
