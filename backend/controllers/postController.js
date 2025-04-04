const Post = require('../models/postModel');
const User = require('../models/userModel')
const mongoose = require('mongoose');

// Create post
const createPost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: 'User not authenticated'});
        }
        
        const user = req.user._id;
        const {title, content, video, photo, tags} = req.body; 

        const newPost = new Post({user, title, content,video, photo, tags})
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
        const {title, content, video , photo ,tags} = req.body; // all of em optional

        const post = await Post.findById(id);

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only edit your own posts' });
        }

        // only get fields that are not null
        const updateFields = Object.fromEntries(
            Object.entries({title, content, video, photo, tags}).filter(([_, v]) => v != null && v !== "")
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
        const {id} = req.params; // post id
        const post = await Post.findById(id);

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own posts' });
        }

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
            .populate('comments.user', 'username pfp')
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
        .populate('comments.user', 'username pfp')
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
    const {content, parentCommentId = null} = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const user = req.user._id;

        const newComment = {
            _id: new mongoose.Types.ObjectId(),
            user: user,
            content: content,
            comments: [],
            edited: false
        }
        

        // add the comment to the post's comments array
        if (parentCommentId) {
            const parentComment = findCommentById(post.comments, parentCommentId);
            if (!parentComment) {
                return res.status(404).json({ message: 'Parent comment not found' });
            }
            // add comment to parent comment
            parentComment.comments.push(newComment);
            post.markModified('comments');

        } else {
            post.comments.push(newComment);
        }
        
        await post.save();
        res.json(post); // return updated post
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const editComment = async (req, res) => {
    const { postId, commentId } = req.params;  
    const { content } = req.body;              

    try {
        // Find the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Find the comment inside the post
        const comment = findCommentById(post.comments, commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user is authorized to edit this comment
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only edit your own comments' });
        }

        // Update the comment
        comment.content = content;
        comment.edited = true;
        // Mark modified (because mongoose doesn’t track changes in deeply nested objects unless explicitly marked as modified)
        post.markModified('comments');

        // Save the updated post with the edited comment
        await post.save();

        res.json({ message: 'Comment updated successfully', comment });

    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Helper function for deleting nested comments
const deleteCommentRecursive = (comments, commentId) => {
    for (let i = 0; i < comments.length; i++) {
        if (comments[i]._id.toString() === commentId) {
            comments.splice(i, 1); // Remove comment from array
            return true;
        }
        if (comments[i].comments && comments[i].comments.length > 0) {
            const deleted = deleteCommentRecursive(comments[i].comments, commentId);
            if (deleted) return true; // If deleted in deeper level, return
        }
    }
    return false; // Not found
};

// permanently delete comment
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

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }
    
        // remove the comment from the comments array
        const deleted = deleteCommentRecursive(post.comments, commentId);
        if (!deleted) {
            return res.status(404).json({ message: 'Failed to delete comment' });
        }

        post.markModified('comments');
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// Function to populate users in comments
const populateComments = async(comments) => {
    return Promise.all(
        comments.map(async (comment) => {
            const commentUser = await User.findById(comment.user, 'username pfp').lean();
            comment.user = commentUser || comment.user;
            if (comment.comments && comment.comments.length > 0) {
                comment.comments = await populateComments(comment.comments);
            }
            return comment;
        })
    )
}

// Get a specific post
const getPost = async(req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id)
            .populate('user', 'username pfp')
            .populate('comments.user', 'username pfp')
        
        post.comments = await populateComments(post.comments);

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
        const { id } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if user has already upvoted
        const hasUpvoted = post.upvotedBy.includes(userId);
        const hasDownvoted = post.downvotedBy.includes(userId);

        if (hasUpvoted) {
            // Remove upvote
            post.upvotedBy = post.upvotedBy.filter(id => id.toString() !== userId.toString());
            post.upvotes--;
        } else {
            // Remove downvote if user has downvoted before
            if (hasDownvoted) {
                post.downvotedBy = post.downvotedBy.filter(id => id.toString() !== userId.toString());
                post.downvotes--;
            }

            // Add upvote
            post.upvotedBy.push(userId);
            post.upvotes++;
        }

        await post.save();
        res.json({ message: 'Vote updated', upvotes: post.upvotes, downvotes: post.downvotes, upvotedBy: post.upvotedBy, downvotedBy: post.downvotedBy });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Downvote a post
const downvotePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if user has already downvoted
        const hasDownvoted = post.downvotedBy.includes(userId);
        const hasUpvoted = post.upvotedBy.includes(userId);

        if (hasDownvoted) {
            // Remove downvote
            post.downvotedBy = post.downvotedBy.filter(id => id.toString() !== userId.toString());
            post.downvotes--;
        } else {
            // Remove upvote if user has upvoted before
            if (hasUpvoted) {
                post.upvotedBy = post.upvotedBy.filter(id => id.toString() !== userId.toString());
                post.upvotes--;
            }

            // Add downvote
            post.downvotedBy.push(userId);
            post.downvotes++;
        }

        await post.save();
        res.json({ message: 'Vote updated', upvotes: post.upvotes, downvotes: post.downvotes, upvotedBy: post.upvotedBy, downvotedBy: post.downvotedBy });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get posts with a specific tag
const getPostsByTag = async (req, res) => {
    try {
        const {tag} = req.params;
        
        const posts = await Post.find({tags: {
                                        $elemMatch: {
                                            $regex: `^${tag}$`,
                                            $options: 'i',
                                        }
                                     }})
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
                {tags: {
                    $elemMatch: {
                        $regex: `^${search}$`,
                        $options: 'i',
                    }
                }}
            ]
        })
            .populate('user', 'username pfp')
            .populate('comments.user', 'username pfp')
            .sort({date: -1});
        
        res.json(posts);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

// Get comments by a specific user
const getCommentsByUserId = async (req, res) => {
    try {
        const {userId} = req.params;
        const posts = await Post.find()
            .populate('comments.user', 'username pfp')
            .sort({date: -1});

        for (let post of posts) {
            post.comments = await populateComments(post.comments);
        }

        let comments = [];

        const findUserComments = (commentsArr) => {
            commentsArr.forEach(comment => {
                if (comment.user._id.toString() === userId) {
                    comments.push(comment);
                }
                if (comment.comments && comment.comments.length > 0) {
                    findUserComments(comment.comments);
                }
            })
        }

        posts.forEach(post => {
            findUserComments(post.comments)
        });

        res.json(comments);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
} 

// Delete comments by a specific user
const deleteCommentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all posts that contain comments by this user
        const posts = await Post.find()
            .populate('comments.user', 'username pfp')
            .sort({ date: -1 });

        const deleteUserComments = (commentsArr) => {
            return commentsArr.filter(comment => {
                if (comment.user._id.toString() === userId) {
                    return false; // delete comment
                }
                if (comment.comments && comment.comments.length > 0) {
                    comment.comments = deleteUserComments(comment.comments);
                }
                return true;
            }); 
        };
        // Iterate through posts and remove the user's comments
        for (let post of posts) {
            post.comments = deleteUserComments(post.comments)
            post.markModified('comments')
            await post.save(); // Save the updated post
        }

        res.json({ message: "Comments deleted successfully." });

    } catch (error) {
        res.status(500).json({ error: error.message });
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
    searchPosts,
    getCommentsByUserId,
    deleteCommentsByUserId
};