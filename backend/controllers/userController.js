
const asyncHandler = require('express-async-handler')

// @desc    Create User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ status : "create user"})
})

// @desc    Login Post
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({ status : "login user"})
})

// @desc    Get User Data
// @route   GET /api/users/data
// @access  Private
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json({ status : "get user"})
})

module.exports = {
    registerUser,
    loginUser,
    getUser
}