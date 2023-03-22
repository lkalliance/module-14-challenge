const router = require('express').Router();
const { Post } = require('../../models');
const isAuth = require('../../utils/auth');

router.post('/', isAuth, async (req, res) => {
  // Creates a new post
  try {
    // Just in case front end fails to prevent empty submission
    if (req.body.title == "" || req.body.content =="") {
      res.status(400).json({ message: "Posts must have both a title and content." });
      return;
    }

    const postData = await Post.create({
      content: req.body.content,
      title: req.body.title,
      user_id: req.session.user
    });
    const post = postData.get({ plain: true });
    console.log(post)

    // check for a good return
    if ( !post.id ) {
      res.status(500).json({ message: "Post not added."});
      return;
    }

    res.status(200).json({ message: "Post added!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', isAuth, async (req, res) => {
  // Deletes a post
  try {
    // make sure requested post is linked to currently logged-in user
    const postData = await Post.findOne({
      where: { id: req.params.id, user_id: req.session.user }
    })

    if (!postData) {
      res.status(400).json({ message: 'Either this post does not exist or you do not have permissions to delete it.' });
      return;
    }

    await Post.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json({ message: 'Post deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.put('/:id', isAuth, async (req, res) => {
  // edits a post
  try {
    // just in case front end fails to catch it
    if (req.body.title == "" || req.body.content =="") {
      res.status(400).json({ message: "Posts must have both a title and content."});
      return;
    }
    // make sure requested post is linked to logged-in user
    const postData = await Post.findOne({
      where: { id: req.params.id, user_id: req.session.user }
    })

    if (!postData) {
      res.status(400).json({ message: 'Either this post does not exist or you do not have permissions to edit it.' });
      return;
    }

    const postEdit = await Post.update(req.body, {
      where: { id: req.params.id }
    })

    if ( !postEdit[0] ) {
      res.status(500).json({ message: "Post not edited." });
    }
    res.status(200).json({ message: "Post edited!" })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;