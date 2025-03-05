const mongoose = require('mongoose');


const Schema = mongoose.Schema;

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
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    comments: [{
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
        }
    }]
});


module.exports = mongoose.model('Post', userSchema);