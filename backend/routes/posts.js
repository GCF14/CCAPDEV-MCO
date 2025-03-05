const express = require('express');
const router = express.Router();
// controller
const {
    createPost, 
    editPost, 
    deletePost, 
    getAllPosts, 
    getPostsByUserId,
    createComment, 
    editComment, 
    deleteComment
} = require('../controllers/postController');

// create post route
router.post('/create', createPost);

// edit post route
router.put('/:id', editPost);

// delete post route
router.delete('/:id', deletePost);

// get all posts route
router.get('/', getAllPosts);

// get posts by a specific user route
router.get('/user/:userId', getPostsByUserId);

// create comment route
router.post('/:postId', createComment);

// edit comment route
router.put('/:postId/comments/:commentId', editComment);

// delete comment route
router.delete('/:postId/comments/:commentId', deleteComment);



module.exports = router;