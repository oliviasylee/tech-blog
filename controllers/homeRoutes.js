const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts
router.get('/', async(req, res) => {
        try {
            const postData = await Post.findAll({
                include: [
                    { 
                      model: User, 
                      attributes: ['username']
                    },
                    // { model: Comment, 
                    //   attributes: ['content', 'date_created'],
                    //   as: 'comments' 
                    // }
                  ],
        });
        const posts = postData.map(post => post.get({ plain: true }));
        console.log(posts);
        
        res.render('home', {
            posts,
            logged_in: req.session.logged_in,
    });
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
});

// Login route
router.get('/login', async(req, res) => {
    if (req.session.logged_in) {
        // changed dashboard -> /
        res.redirect('/');
        return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
});

// Join route
router.get('/join', async(req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
      res.render('join');
    });

module.exports = router;