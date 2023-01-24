const express = require('express')
const app = express()

const testRoutes = require('./test')
const authRoutes = require('./auth')
const historyRoutes = require('./history')
const adminRoutes = require('./admin')
const userRoutes = require('./user')

app.use('/test', testRoutes)
app.use('/auth', authRoutes)
app.use('/history', historyRoutes)
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)

module.exports = app