import db from '../models'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
require('dotenv').config()
import chothucanho from '../../data/chothuecanho.json'
import chothuematbang from '../../data/chothuematbang.json'
import chothuephongtro from '../../data/chothuephongtro.json'
import nhachothue from '../../data/nhachothue.json'

import generateCode from '../ultis/generateCode'

const databody = nhachothue.body

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      databody.forEach(async (item) => {
        let postId = v4()
        let attributesId = v4()
        let labelCode = generateCode(item?.header?.class?.classType)
        let userId = v4()
        let overviewId = v4()
        let imagesId = v4()
        let date = new Date()

        await db.Post.create({
          id: postId,
          title: item?.header?.title,
          star: item?.header?.star,
          labelCode: labelCode,
          address: item?.header?.address,
          attributesId: attributesId,
          categoryCode: 'NCT',
          description: JSON.stringify(item?.mainContent.content),
          userId: userId,
          overviewId: overviewId,
          imagesId: imagesId
        })

        await db.Attribute.create({
          id: attributesId,
          acreage: item?.header?.attributes?.acreage,
          price: item?.header?.attributes?.price,
          published: item?.header?.attributes?.published,
          hashtag: item?.header?.attributes?.hashtag
        })

        await db.Image.create({
          id: imagesId,
          image: JSON.stringify(item?.images)
        })

        await db.Label.findOrCreate({
          where: { code: labelCode },
          defaults: {
            code: labelCode,
            value: item?.header?.class?.classType
          }
        })

        await db.Overview.create({
          id: overviewId,
          code: item?.overview.content.find((i) => i.name === 'Mã tin:')?.content,
          area: item?.overview.content.find((i) => i.name === 'Khu vực')?.content,
          type: item?.overview.content.find((i) => i.name === 'Loại tin rao:')?.content,
          target: item?.overview.content.find((i) => i.name === 'Đối tượng thuê:')?.content,
          created: date,
          expired: date,
          bonus: item?.overview.content.find((i) => i.name === 'Gói tin:')?.content
        })

        await db.User.create({
          id: userId,
          name: item?.contact.content.find((i) => i.name === 'Liên hệ:')?.content,
          password: hashPassword('123456'),
          phone: item?.contact.content.find((i) => i.name === 'Điện thoại:')?.content,
          zalo: item?.contact.content.find((i) => i.name === 'Zalo')?.content
        })
      })

      resolve('Done')
    } catch (error) {
      reject(error)
    }
  })
