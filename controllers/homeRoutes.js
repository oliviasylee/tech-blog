const router = require('express').Router();
const { User } = require('../models');

router.get('/', async(req, res) => {
    res.render('home');
});

router.get('/join', async(req, res) => {
    console.log('join route called');
    res.render('join');
});

module.exports = router;