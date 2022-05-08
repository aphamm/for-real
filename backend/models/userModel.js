const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        username: {
            type: String,
            required: [true, 'Please add a username'],
            unqiue: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)