const Post = require('../models/postModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Create post
const createPost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: 'User not authenticated'});
        }
        
        const user = req.user._id;
        const {title, content} = req.body;

        const newPost = new Post({user, title, content})
        await newPost.save();

        res.status(201).json({message: 'New post created', post: newPost})
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Edit post
const editPost = async (req, res) => {
    try {
        const {id} = req.params; // post id
        const {title, content} = req.body;

        const editedPost = await Post.findByIdAndUpdate(id, {title, content}, {new: true})
        res.json({ message: 'Post edited successfully', post: updatedPost });
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Delete post
const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        res.json({ message: 'Post deleted successfully' });
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'username')
            .populate('comments.user', 'username');
        res.json(posts);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Get posts by a specific user
const getPostsByUserId = async (req, res) => {
    const {userId} = req.params;
    try {
        const posts = await Post.find({user: userId})
            .populate('user', 'username')
            .populate('comments.user', 'comments')
            .sort({date: -1});
        res.json(posts);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Add a comment
const createComment = async (req, res) => {
    const {postId} = req.params;  
    const {content} = req.body; 

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const user = req.user._id;

        // add the comment to the post's comments array
        post.comments.push({
            user: user,   
            content: content 
        });
        await post.save();
        res.json(post); // return updated post
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Edit a comment
const editComment = async (req, res) => {
    const {postId, commentId} = req.params;  
    const {content} = req.body;              

    try {
        const post = await Post.findById(postId);

        if (!post) {
        return res.status(404).json({ message: 'Post not found' });
        }

        // find the comment index by matching the commentId
        const commentIndex = post.comments.findIndex(
            comment => comment._id.toString() === commentId
        );

        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only edit your own comments' });
        }

        // update the comment

        post.comments[commentIndex].content = content;
        await post.save();

        res.json(post);  // return the updated post with the edited comment
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    const {postId, commentId} = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
      
        // find the comment index by matching the commentId
        const commentIndex = post.comments.findIndex(
            comment => comment._id.toString() === commentId
        );
        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (post.comments[commentIndex].user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }
    
        // remove the comment from the comments array
        post.comments.splice(commentIndex, 1);
        await post.save();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createPost,
    editPost,
    deletePost,
    getAllPosts,
    getPostsByUserId,
    createComment,
    editComment,
    deleteComment
};