const router = require('express').Router();
const { Comment } = require('../../models');
const isAuth = require('../../utils/auth');

router.post('/', isAuth, async (req, res) => {
  // Creates a new comment
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user
    });

    res.redirect(req.originalUrl);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
