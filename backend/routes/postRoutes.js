const express = require('express')
const router = express.Router()
const {
    getPost,
    setPost,
    updatePost,
    deletePost,
} = require('../controllers/postController')

router.route('/').get(getPost).post(setPost)
router.route('/:id').put(updatePost).delete(deletePost)

module.exports = router