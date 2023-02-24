const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// 홈페이지에서 렌더링되는 라우트
// 홈라우트를 설정해야 로그인하면 네브바가 변경되는 것을 설정
router.get('/', async(req, res) => {
    if(!req.session.logged_in){
        res.redirect('/login')
    } else {
        try {
            const dbUser = await User.findByPk(req.session.user_id, {
            attributes: [
                `id`,
                `username`,
                `email`,
            ],
        });
        const user = dbUser.get({ plain: true });
        res.render('home', {
            user,
            logged_in: req.session.logged_in, })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
});

// Dashboard route
router.get('/dashboard', async(req, res) => {
    if(!req.session.logged_in){
        res.redirect('/login')
    } else {
        try {
            const dbUser = await User.findByPk(req.session.user_id, {
            attributes: [
                `id`,
                `username`,
                `email`,
            ],
        });
        const user = dbUser.get({ plain: true });
        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in, })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
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