require("dotenv").config()
const cors = require('cors')

const express = require('express')
const errorHendle = require('./middlewares/errorHandle')
const app = express()
const router = require('./router/index')


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)
app.use(errorHendle)

module.exports = app