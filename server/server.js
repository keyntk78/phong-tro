import express from 'express'
require('dotenv').config()
import cors from 'cors'

import initRoutes from './src/routes/index'

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL, methods: ['POST', 'GET', 'PUT', 'DELETE'] }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)

const port = process.env.PORT || 8000

const listenner = app.listen(port, () => {
  console.log(`Server is running on port ${listenner.address().port}`)
})
