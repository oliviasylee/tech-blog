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
                'createdAt',
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }]
        })
        const posts = postData.map(post => post.get({ plain: true }));
        console.log(posts);

        // loggedIn -> logged_in
        res.render('dashboard', { user, posts, logged_in: true });
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


// router.get('/dashboard', withAuth, async(req, res) => {
//         try {
//             const userData = await User.findByPk(req.session.user_id, {
//                 include: [{ model: Post }]
//         });

//         const user = userData.get({ plain: true });
//         console.log(user);

//         res.render('dashboard', {
//             user,
//             logged_in: req.session.logged_in, })
//         } catch (err) {
//             console.log(err)
//             res.status(500).json(err)
//         }
    
// });

// Route to create a new post by the user
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
                'createdAt',
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }]
        })
        const posts = postData.map(post => post.get({ plain: true }));
        console.log(posts);

        // loggedIn -> logged_in
        res.render('newpost', { posts, logged_in: true });
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = router;