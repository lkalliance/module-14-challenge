const router = require('express').Router();
const { Post } = require('../../models');
const isAuth = require('../../utils/auth');

// CREATE new post
router.post('/', isAuth, async (req, res) => {
  try {
    console.log("I'm about to post a post")
    const postData = await Post.create({
      content: req.body.content,
      title: req.body.title,
      user_id: req.session.user
    });

    const newPost = postData.get({ plain: true });
    const sendTo = `/posts/view/${newPost.id}`;
    console.log(sendTo);
    res.status(307).redirect(sendTo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
