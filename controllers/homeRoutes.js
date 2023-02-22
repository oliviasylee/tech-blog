const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    res.render('home');
});

router.get('/dashboard', async(req, res) => {
    res.render('dashboard');
});

router.get('/login', async(req, res) => {
    res.render('login');
});


router.get('/join', async(req, res) => {
    res.render('join');
});

module.exports = router;