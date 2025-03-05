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
    deleteComment,
    upvotePost,
    downvotePost,
    getPostsByTag
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

// upvote post route
router.post('/:id/upvote', upvotePost);

// downvote post route
router.post('/:id/downvote', downvotePost);

//get posts by tag route
router.post('/:tag', getPostsByTag);

module.exports = router;