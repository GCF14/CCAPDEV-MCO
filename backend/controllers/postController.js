const Post = require('../models/postModel');
const mongoose = require('mongoose');

// Create post
const createPost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: 'User not authenticated'});
        }
        
        const user = req.user._id;
        const {title, content, tags = null} = req.body; // tags are optional

        const newPost = new Post({user, title, content, tags})
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
        const {title = null, content = null, tags = null} = req.body; // all of em optional

        // only get fields that are not null
        const updateFields = Object.fromEntries(
            Object.entries({title, content, tags}).filter(([_, v]) => v != null)
        );
        // only update if at least one field was changed
        if (Object.keys(updateFields).length > 0) {
            const editedPost = await Post.findByIdAndUpdate(id, {...updateFields, edited:true}, { new: true });
            res.json({ message: 'Post edited successfully', post: editedPost });
        }
        
        

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
    console.log("getAllPosts route hit by user:", req.user)
    try {
        const posts = await Post.find()
            .populate('user', 'username pfp')
            .populate('comments.user', 'username pfp')
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
            .populate('user', 'username pfp')
            .populate('comments.user', 'comments pfp')
            .sort({date: -1});
        res.json(posts);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Get all posts sorted by popularity (most upvotes)
const getPopularPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        .populate('user', 'username pfp')
        .populate('comments.user', 'comments pfp')
        .sort({upvotes: -1});
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
    const {content, parentCommentId = null} = req.body; // parentCommendId optional if nested comment 
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const user = req.user._id;

        // if nested comment
        if (parentCommentId) {
            const parentComment = findCommentById(post.comments, parentCommentId);
            if (!parentComment) {
                return res.status(404).json({ message: 'Parent comment not found' });
            }
            // add comment to parent comment
            parentComment.comments.push({
                user: user,
                content: content
            });
        } else {
            // add the comment to the post's comments array
            post.comments.push({
                user: user,   
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

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only edit your own comments' });
        }

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

        if (post.comments[commentIndex].user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }
    
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
        const post = await Post.findById(id)
            .populate('user', 'username pfp')
            .populate('comments.user', 'comments pfp');
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
        const {tag} = req.params;

        const posts = await Post.find({tags: {$in: [tag]}})
            .populate('user', 'username pfp')
            .populate('comments', 'username pfp')
            .sort({date: -1});
        
        res.json(posts);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Search for keywords in a post
const searchPosts = async (req, res) => {
    try {
        const {search} = req.params;
        if (!search) {
            return res.status(400).json({error: 'Search term required'});
        }
        // case insensitive search for query
        const posts = await Post.find({
            $or: [
                {title: {$regex: `\\b${search}\\b`, $options: 'i'}}, 
                {content: {$regex: `\\b${search}\\b`, $options: 'i'}},
                {tags: {$in: [search]}}
            ]
        })
            .populate('user', 'username pfp')
            .populate('comments.user', 'comments pfp')
            .sort({date: -1});
        
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