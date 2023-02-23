const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    res.render('home');
});

router.get('/dashboard', async(req, res) => {
    res.render('dashboard');
});

// Login route
router.get('/login', async(req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
});

router.get('/join', async(req, res) => {
    res.render('join');
});

module.exports = router;