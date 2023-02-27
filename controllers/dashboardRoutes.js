const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route for a logged in user
router.get('/', withAuth, async(req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: ['username']
      });
      const user = userData.get({ plain: true });
      console.log(user);

      const postData = await Post.findAll({
          where: {
              user_id: req.session.user_id
          },
          attributes: [
              'id',
              'title',
              'contents',
              'user_id',
              'created_at',
          ],
          include: [
              {
                  model: User,
                  attributes: ['username']
              },
              {
                  model: Comment,
                  attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              }
          ]
      });
      const posts = postData.map(post => post.get({ plain: true }));
      console.log(posts);
      
      const commentData = await Comment.findAll({
          where: {
              user_id: req.session.user_id
          },
          attributes: [
              'id',
              'comment',
              'post_id',
              'user_id',
              'created_at',
          ],
          include: [
              {
                  model: User,
                  attributes: ['username']
              },
              {
                  model: Post,
                  attributes: ['title']
              }
          ]
      });
      const comments = commentData.map(comment => comment.get({ plain: true }));
      console.log(comments);

      res.render('dashboard', { user, posts, comments, logged_in: true });
  
  } catch (err) {
      console.log(err)
      res.status(500).json(err)
  }
});

// Route to edit a post 
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ['id', 'title', 'contents', 'created_at'],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
  
      const post = postData.get({ plain: true });
      res.render('editpost', {
        post,
        logged_in: true,
        username: req.session.username,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Route to edit a comment 
router.get('/editcomment/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    const comment = commentData.get({ plain: true });
    res.render('editcomment', {
      comment,
      logged_in: true,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new post by author
router.get('/newpost', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'contents',
                'user_id',
                'created_at',
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }]
        })
        const posts = postData.map(post => post.get({ plain: true }));
        console.log(posts);

        res.render('newpost', { posts, logged_in: true });
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = router;