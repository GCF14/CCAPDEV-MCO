const express = require('express');
const router = express.Router();
// controller
const {
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

// get all posts sorted by popularity
router.get('/popular', getPopularPosts);

// create comment route
router.post('/:postId', createComment);

// edit comment route
router.put('/:postId/comments/:commentId', editComment);

// delete comment route
router.delete('/:postId/comments/:commentId', deleteComment);

// get specific post route
router.get('/:id', getPost);

// upvote post route
router.post('/:id/upvote', upvotePost);

// downvote post route
router.post('/:id/downvote', downvotePost);

// get posts by tag route
router.post('/:tag', getPostsByTag);

// search posts route
router.get('/search', searchPosts);


module.exports = router;