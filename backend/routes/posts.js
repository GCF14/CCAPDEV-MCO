const express = require('express');

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
    searchPosts,
    getCommentsByUserId,
    deleteCommentsByUserId
} = require('../controllers/postController');

// middleware
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all post routes
router.use(requireAuth);

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
router.patch('/:postId/comments/:commentId', editComment);

// delete comment route
router.delete('/:postId/comments/:commentId', deleteComment);

// get specific post route
router.get('/:id', getPost);

// upvote post route
router.put('/:id/upvote', upvotePost);

// downvote post route
router.put('/:id/downvote', downvotePost);

// get posts by tag route
router.get('/search/tags/:tag', getPostsByTag);

// search posts route
router.get('/search/:search', searchPosts);

// get comments by specific user route
router.get('/user/:userId/comments', getCommentsByUserId)

// delete comments by specific user route
router.delete('/user/:userId/comments', deleteCommentsByUserId)


module.exports = router;