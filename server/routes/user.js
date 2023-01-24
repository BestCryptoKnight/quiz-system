const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/get_users', userController.get_users)
router.get('/get_user/:id', userController.get_user)
router.post('/add_user', userController.add_user)
router.post('/update_user/:id', userController.update_user)
router.delete('/delete_user/:id', userController.delete_user)

module.exports = router