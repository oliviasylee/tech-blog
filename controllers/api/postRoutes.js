const router = require('express').Router();
const { Post,  User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'contents', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: [
            'id',
            'comment',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: { model: User, attributes: ['username'] },
        },
      ],
    });
    res.status(200).json(postData.reverse());
  } catch (err) {
    res.status(400).json(err);
  }
})

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

// Create a new post
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

// Put(Update) a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        contents: req.body.contents,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedPost) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { 
        id: req.params.id 
      }
    });

  if (!postData) {
    return res.status(404).json({
      message: 'No post found with this id'});
    }
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

module.exports = router;