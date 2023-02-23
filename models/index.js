const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User hasmany post
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// User hasmany comment
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

// Post belongsto User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Post hasmany comments -> but not vice versa
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

// Comment belongs to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Comment belongsto Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// Note that Comment does not have a "has many" relationship with User, as each comment is associated with only one post and therefore one user.

module.exports = { User, Post, Comment };