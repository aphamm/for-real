const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        prompt: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Prompt'
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        response: {
            type: String,
            required: [true, 'Please add a response']
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Post', postSchema)