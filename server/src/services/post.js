import db from '../models'

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: 'images', attributes: ['image'] },
          { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published', 'hashtag'] },
          { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] }
        ],
        attributes: ['id', 'title', 'star', 'address', 'description']
      })

      resolve({
        err: resolve ? 0 : 1,
        msg: resolve ? 'OK' : 'Gotting post is failed',
        response
      })
    } catch (error) {
      reject(error)
    }
  })

export const getPostsPaginationService = (offset) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT || 0,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: 'images', attributes: ['image'] },
          { model: db.Attribute, as: 'attribute', attributes: ['price', 'acreage', 'published', 'hashtag'] },
          { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] }
        ],
        attributes: ['id', 'title', 'star', 'address', 'description']
      })

      resolve({
        err: resolve ? 0 : 1,
        msg: resolve ? 'OK' : 'Gotting post is failed',
        response
      })
    } catch (error) {
      reject(error)
    }
  })
