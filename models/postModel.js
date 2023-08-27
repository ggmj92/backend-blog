const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

/**
 * @typedef {Object} PostImage
 * @property {string} src - The source URL of the image.
 * @property {string} alt - The alternative text for the image.
 */

/**
 * @typedef {Object} PostDocument
 * @property {string} title - The title of the post.
 * @property {Schema.Types.ObjectId} author - The ID of the author (refers to the "User" model).
 * @property {Date} date - The date the post was created.
 * @property {string} content - The content of the post.
 * @property {PostImage} image - The image associated with the post.
 */

/**
 * Post schema for MongoDB.
 * @type {import('mongoose').Schema<PostDocument>}
 */
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    date: {
      type: Date,
      default: Date.now,
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      src: {
        type: String,
        required: false,
      },
      alt: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Mongoose model representing a post.
 * @type {import('mongoose').Model<PostDocument>}
 */
const Post = model('Post', postSchema);

module.exports = Post;
