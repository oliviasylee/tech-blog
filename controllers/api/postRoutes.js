const router = require('express').Router();
const { Post,  User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id
      });
      res.json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Get a single post
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'contents',
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        // {
        //   model: Comment,
        //   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //   include: {
        //     model: User,
        //     attributes: ['name']
        //   }
        // }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;