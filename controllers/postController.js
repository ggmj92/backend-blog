const Post = require('../models/postModel')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dayjs = require('dayjs');

/**
 * Get all blog posts.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The response JSON object.
 */
const getPosts = async (req, res) => {

    try {
        const posts = await Post.find().populate('author')
        const formattedPosts = posts.map((post) => {

            post.date = dayjs(post.date).format('DD/MM/YYYY')
            return post

        })
        console.log('get posts', posts)

        return res.status(200).json({
            ok: true,
            msg: 'Showing all blog posts',
            data: formattedPosts,
            user: req.name
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Please contact the administrator.'
        })

    }
}

/**
 * Get control posts based on user role.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The response JSON object.
 */
const getControlPosts = async (req, res) => {

    try {

        const user = await User.findById(req._id)

        if (user.isAdmin) {

            const posts = await Post.find().populate('author')

            return res.status(200).json({
                ok: true,
                msg: 'Showing all blog posts',
                data: posts,
                user: user
            })

        } else {
            const userPosts = await Post.find({ author: user._id })

            return res.status(200).json({
                ok: true,
                msg: 'Showing all blog posts',
                data: userPosts,
                user: user
            })

        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Please contact the administrator.'
        })

    }
}

/**
 * Get a blog post by its ID.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The response JSON object.
 */
const getPostById = async (req, res) => {
    const id = req.params.id

    try {
        const exists = await Post.findById(id).populate('author')

        if (exists) {
            return res.status(200).json({
                ok: true,
                data: exists,
                msg: 'Blog post found.'
            })

        } else {
            return res.status(400).json({
                msg: 'No blog posts found with this title.'
            })

        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Please contact the administrator.'
        })
    }
}

/**
 * Search blog posts by title.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The response JSON object.
 */
const searchPosts = async (req, res) => {
    const title = await req.params.title

    try {
        const exists = await Post.findOne({ title })

        if (exists) {
            return res.status(200).json({
                ok: true,
                data: exists,
                msg: 'Blog post found.'
            })

        } else {
            return res.status(400).json({
                msg: 'No blog posts found with this title.'
            })

        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Please contact the administrator.'
        })
    }
}


/**
 * Create a new blog post.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The response JSON object.
 */
const createPost = async (req, res) => {

    console.log('create post', req.body)

    try {
        const { title } = req.body
        const exists = await Post.findOne({ title })

        if (exists) {
            return res.status(400).json({
                ok: false,
                msg: 'A post with this title already exists.'
            })

        }

        console.count()

        const newPost = { ...req.body, author: req._id }
        const postStored = await Post.create(newPost)
        console.count()
        return res.status(201).json({
            ok: true,
            post: postStored,
            msg: 'Post added successfully.'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Please contact the administrator.'
        })

    }
}


/**
 * Update a blog post by its ID.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The response JSON object.
 */

const updatePost = async (req, res) => {
    const id = req.params.id
    console.log('update backend', req.body)

    try {

        const exists = await Post.findOne({ _id: id })
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log('after update', updatedPost)

        if (exists) {
            return res.status(200).json({
                ok: true,
                post: updatedPost,
                msg: 'The blog post has been updated.'
            })

        } else {

            return res.status(400).json({
                ok: false,
                msg: 'No blog posts with this ID exist.'
            })
        }

    } catch (error) {
        console.log(error);
        // return res.status(500).json({
        //     ok: false,
        //     msg: 'Error 500. Please contact the administrator.'
        // })
    }
}


/**
 * Delete a blog post by its ID.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The response JSON object.
 */
const deletePost = async (req, res) => {
    console.log('backend delete', req.params)
    const id = await req.params.id

    try {
        const exists = await Post.findByIdAndDelete(id)

        if (exists) {
            return res.status(200).json({
                ok: true,
                data: exists,
                msg: 'Blog post has been deleted.'
            })

        } else {
            return res.status(400).json({
                msg: 'No blog posts with this ID exist.'
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error 500. Please contact the administrator.'
        })

    }
}


//EXPORTING FUNCTIONS
module.exports = {
    getPosts,
    getControlPosts,
    getPostById,
    searchPosts,
    createPost,
    updatePost,
    deletePost
}