const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({});
      res.json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

router.post('/', withAuth, async (req, res) => {
try {
    if (req.session) {
    const commentData = await Comment.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    });
    res.json(commentData);
    }
} catch (err) {
    console.log(err);
    res.status(400).json(err);
}
});
  

module.exports = router;