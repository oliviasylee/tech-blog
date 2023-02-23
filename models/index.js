const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User hasmany post
// user hasmany comment
// Post belongsto User
// Comment belongsto Post
// Post hasmany comment -> but not vice versa

module.exports = { User, Post, Comment };