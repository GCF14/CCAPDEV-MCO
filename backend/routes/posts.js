const express = require('express');

// controller
const {
    createPost, 
    editPost, 
    deletePost, 
    getAllPosts, 
    getPostsByUserId, 
    editComment, 
    deleteComment
} = require('../controllers/postController');

const router = express.Router();

// create post route
router.post('/post', createPost);

// edit post route
router.put('/post/:id', editPost);

// delete post route
router.delete('/post/:id', deletePost);

// get all posts route
router.get('/posts', getAllPosts);

// get posts by a specific user route
router.get('/posts/user/:userId', getPostsByUserId);

// create comment route
router.post('/post/:postId', createComment);

// edit comment route
router.put('/post/:postId/comments/:commentId', editComment);

// delete comment route
router.delete('/post/:postId/comments/:commentId', deleteComment);



module.exports = router;