const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const User = require('../models/userModel')

// @desc    Get Post
// @route   GET /api/posts
// @access  Private
const getPost = asyncHandler(async (req, res) => {
    res.status(200).json({ status : "get post"})
})

// @desc    Set Post
// @route   POST /api/posts
// @access  Private
const setPost = asyncHandler(async (req, res) => {
    res.status(200).json({ status : "post post"})
})

// @desc    Update Post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
    res.status(200).json({ status : "update post"})
})

// @desc    Delete Post
// @route   DELETE /api/posts
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    res.status(200).json({ status : "delete post"})
})

module.exports = {
    getPost,
    setPost,
    updatePost,
    deletePost
}