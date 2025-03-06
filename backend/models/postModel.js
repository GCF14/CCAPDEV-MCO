const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// comment schema to allow nested comments
const commentSchema = new Schema({
    // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        username: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        edited: {
            type: Boolean,
            default: false
        },
        comments: [this]
})

const postSchema = new Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    username: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    comments: [commentSchema],

    upvotes: {
        type: Number,
        default: 0
    },

    downvotes: {
        type: Number,
        default: 0
    },

    tags: [{
        type: String
    }],

    edited: {
        type: Boolean,
        default: false
    }
    
});


module.exports = mongoose.model('Post', postSchema);