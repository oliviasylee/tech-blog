const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User hasmany post
User.hasMany(Post, {
    foreignKey: '',
});

// user hasmany comment
User.hasMany(Comment, {
    foreignKey: '',

});

// Post belongsto User
Post.belongsTo(User, {
    foreignKey: '',
});

// Comment belongsto Post
Comment.belongsTo(Post, {
    foreignKey: '',

});

// Post hasmany comment -> but not vice versa
Post.hasMany(Comment, {
    foreignKey: '',

});

// Note that Comment does not have a "has many" relationship with User, as each comment is associated with only one post and therefore one user.

module.exports = { User, Post, Comment };