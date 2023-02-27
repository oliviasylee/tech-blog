const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all Comments
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({});
      res.json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
 
// Get comment by id - retrieve multiple comments with the same id
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new comment 
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

// Put(Update) a comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedComment) {
      res
        .status(404)
        .json({ message: `No comment found with id = ${req.params.id}` });
      return;
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({
        message: `No post owned by user_id = ${req.session.user_id} found with id = ${req.params.id}`,
      });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;