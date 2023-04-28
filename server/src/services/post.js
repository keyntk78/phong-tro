import db from '../models'
const { Op, where } = require('sequelize')

const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: 'images', attributes: ['image'] },
          { model: db.Attribute, as: 'attribute', attributes: ['priceNumber', 'areaNumber', 'published', 'hashtag'] },
          { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone', 'avatar'] }
        ],
        attributes: ['id', 'title', 'star', 'address', 'description', 'slug']
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

const getPostsPaginationService = (page, query, { priceNumber, areaNumber }) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1

      const queries = {}

      if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
      if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber }

      const response = await db.Post.findAndCountAll({
        where: {
          ...query
        },
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT || 0,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: 'images', attributes: ['image'] },
          {
            model: db.Attribute,
            as: 'attribute',
            attributes: ['priceNumber', 'areaNumber', 'published', 'hashtag'],
            where: queries
          },
          { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone', 'avatar'] }
        ],

        attributes: ['id', 'title', 'star', 'address', 'description', 'slug']
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

const getNewPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: 'images', attributes: ['image'] },
          { model: db.Attribute, as: 'attribute', attributes: ['priceNumber', 'areaNumber', 'published', 'hashtag'] },
          { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone', 'avatar'] }
        ],
        attributes: ['id', 'title', 'star', 'address', 'description', 'slug', 'createdAt']
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

export default {
  getPostsService,
  getPostsPaginationService,
  getNewPostsService
}
