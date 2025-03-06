const Post = require('../models/postModel');
const mongoose = require('mongoose');

// Create post
const createPost = async (req, res) => {
    try {
        // if (!req.user) {
        //     return res.status(401).json({message: 'User not authenticated'});
        // }
        
        // const user = req.user._id;
        // const {title, content} = req.body;
        const {username, title, content} = req.body;

        const newPost = new Post({username, title, content})
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

        const editedPost = await Post.findByIdAndUpdate(id, {title, content, edited: true}, {new: true})

        res.json({ message: 'Post edited successfully', post: editedPost });
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
            // .populate('user', 'username')
            // .populate('comments.user', 'username')
            .sort({date: -1});
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
            // .populate('user', 'username')
            // .populate('comments.user', 'comments')
            .sort({date: -1});
        res.json(posts);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Get all posts sorted by popularity (most upvotes)
const getPopularPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({upvotes: -1});
        res.json(posts);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// Helper function to find comment by id recursively (for nested comments)
const findCommentById = (comments, commentId) => {
    for (const comment of comments) {
        if (comment._id.toString() === commentId) {
            return comment; 
        }

        const nestedComment = findCommentById(comment.comments, commentId);
        if (nestedComment) {
            return nestedComment;
        }
    }
    return null; 
};

// Add a comment
const createComment = async (req, res) => {
    const {postId} = req.params;  
    const {username, content, parentCommentId = null} = req.body; // parentCommendId optional if nested comment 
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // const user = req.user._id;

        // if nested comment
        if (parentCommentId) {
            const parentComment = findCommentById(post.comments, parentCommentId);
            if (!parentComment) {
                return res.status(404).json({ message: 'Parent comment not found' });
            }
            // add comment to parent comment
            parentComment.comments.push({
                username: username,
                content: content
            });
        } else {
            // add the comment to the post's comments array
            post.comments.push({
                // user: user,   
                username: username,
                content: content 
            });
        }
        
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

        const comment = findCommentById(post.comments, commentId)
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // if (comment.user.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: 'You can only edit your own comments' });
        // }

        // update the comment
        comment.content = content;
        comment.edited = true;
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
      
        const comment = findCommentById(post.comments, commentId)
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // if (post.comments[commentIndex].user.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: 'You can only delete your own comments' });
        // }
    
        // remove the comment from the comments array
        comment.content = 'This comment has been deleted.';
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific post
const getPost = async(req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// Upvote a post
const upvotePost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findByIdAndUpdate(
            id,
            {$inc: {upvotes: 1}},
            {new: true}
        );

        if (!post)
            return res.status(404).json({message: 'Post not found'});

        res.json({message: 'Post upvoted', upvotes: post.upvotes})
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Downvote a post
const downvotePost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findByIdAndUpdate(
            id,
            {$inc: {downvotes: 1}},
            {new: true}
        );

        if (!post)
            return res.status(404).json({message: 'Post not found'});

        res.json({message: 'Post upvoted', downvotes: post.downvotes})
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Get posts with a specific tag
const getPostsByTag = async (req, res) => {
    try {
        const {tag} = req.query;

        const posts = await Post.find({tags: {$in: [tag]}})
            // .populate('user', 'username')
            .sort({date: -1});
        
        res.json(posts);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Search for keywords in a post
const searchPosts = async (req, res) => {
    console.log('hello');
    try {
        console.log(req.query);
        console.log(req.originalUrl);
        const {search} = req.query;
        if (!search) {
            return res.status(400).json({error: 'Search term required'});
        }
        // case insensitive search for query
        const posts = await Post.find({
            $or: [
                {title: {$regex: search, $options: 'i'}}, 
                {content: {$regex: search, $options: 'i'}}
            ]
        }).sort({date: -1});
        
        res.json(posts);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    createPost,
    editPost,
    deletePost,
    getAllPosts,
    getPostsByUserId,
    getPopularPosts,
    createComment,
    editComment,
    deleteComment,
    getPost,
    upvotePost,
    downvotePost,
    getPostsByTag,
    searchPosts
};