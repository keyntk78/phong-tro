import authRouter from './auth.js'
import categoryRouter from './category.js'
import insertRourter from './insert.js'
import postRouter from './post.js'
import priceRouter from './price.js'
import areaRouter from './area.js'

const initRoutes = (app) => {
  // app.use('/api/v1/insert', insertRourter)
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/category', categoryRouter)
  app.use('/api/v1/price', priceRouter)
  app.use('/api/v1/area', areaRouter)
  app.use('/api/v1/post', postRouter)

  return app.use('/', (req, res) => {
    res.send('server on ...')
  })
}

export default initRoutes
