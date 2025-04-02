const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// comment schema to allow nested comments
const commentSchema = new Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),  // Automatically generate an ObjectId
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        default: ''  // Not required anymore
    },

    video: {
        type: String,
        default: ''
    },

    photo: {
        type: String,
        default: ''
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

    upvotedBy: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }], 

    downvotedBy: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }], 

    tags: [{
        type: String
    }],

    edited: {
        type: Boolean,
        default: false
    }
}, {
    // Add a custom validation function
    validate: {
        validator: function(post) {
            return post.content.trim() !== '' || post.video.trim() !== '' || post.photo.trim() !== '';
        },
        message: "Post must contain at least content, a video URL, or a photo URL."
    }
});


module.exports = mongoose.model('Post', postSchema);

