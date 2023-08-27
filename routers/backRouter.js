const express = require('express');
const { check } = require('express-validator');
const { validateExpress } = require("../middleware/validation");
const { validateJWT } = require("../middleware/validationJWT");
const { getLoggedInUser } = require('../middleware/getLoggedInUser');
const {
    getPosts,
    getControlPosts,
    getPostById,
    searchPosts,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/postController");

/**
 * Express router for managing blog posts.
 * @type {import('express').Router}
 */
const router = express.Router();

/**
 * Get all blog posts.
 * @name GET/api/posts
 * @function
 * @memberof module:routes/postRoutes
 * @inner
 * @param {function} middleware - Middleware function to check user authentication.
 * @param {function} handler - Request handler function.
 */
router.get('/', getLoggedInUser, getPosts);

/**
 * Get control posts (requires JWT validation).
 * @name GET/api/posts/control
 * @function
 * @memberof module:routes/postRoutes
 * @inner
 * @param {function} middleware - Middleware function for JWT validation.
 * @param {function} handler - Request handler function.
 */
router.get('/control', validateJWT, getControlPosts);

/**
 * Get a blog post by ID.
 * @name GET/api/posts/:id
 * @function
 * @memberof module:routes/postRoutes
 * @inner
 * @param {function} handler - Request handler function.
 */
router.get('/:id', getPostById);

/**
 * Search for blog posts by title.
 * @name GET/api/posts/search/:title
 * @function
 * @memberof module:routes/postRoutes
 * @inner
 * @param {function} handler - Request handler function.
 */
router.get('/search/:title', searchPosts);

/**
 * Create a new blog post.
 * @name POST/api/posts
 * @function
 * @memberof module:routes/postRoutes
 * @inner
 * @param {Array<function>} middleware - Middleware functions for input validation and JWT validation.
 * @param {function} handler - Request handler function.
 */
router.post('/',
    [
        check('title', 'You must enter a title for this post').not().isEmpty(),
        check('content', 'You must enter text-content for this post').not().isEmpty(),
        validateExpress,
        validateJWT
    ],
    createPost);

/**
 * Update a blog post.
 * @name PUT/api/posts/:id
 * @function
 * @memberof module:routes/postRoutes
 * @inner
 * @param {Array<function>} middleware - Middleware functions for input validation and JWT validation.
 * @param {function} handler - Request handler function.
 */
router.put('/:id',
    [
        check('title', 'You must enter a title for this post').not().isEmpty(),
        check('content', 'You must enter text-content for this post').not().isEmpty(),
        validateExpress,
        validateJWT
    ],
    updatePost);

/**
 * Delete a blog post by ID.
 * @name DELETE/api/posts/:id
 * @function
 * @memberof module:routes/postRoutes
 * @inner
 * @param {function} handler - Request handler function.
 */
router.delete("/:id", deletePost);

module.exports = router;
