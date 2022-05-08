const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUser,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/data', getUser)

module.exports = router