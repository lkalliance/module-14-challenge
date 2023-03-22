const router = require('express').Router();
const { Post } = require('../../models');
const isAuth = require('../../utils/auth');

// CREATE new post
router.post('/', isAuth, async (req, res) => {
  try {
    if (req.body.title == "" || req.body.content =="") {
      res.status(400).json({ message: "Posts must have both a title and content."});
      return;
    }
    const postData = await Post.create({
      content: req.body.content,
      title: req.body.title,
      user_id: req.session.user
    });

    const newPost = postData.get({ plain: true });
    const sendTo = `/posts/view/${newPost.id}`;
    console.log(sendTo);
    res.redirect(sendTo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', isAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id, user_id: req.session.user }
    })

    if (!postData) {
      res
        .status(400)
        .json({ message: 'Either this post does not exist or you do not have permissions to delete it.' });
      return;
    }

    const postDel = await Post.destroy({
      where: { id: req.params.id }
    })

    res.status(200).json({ message: 'Post deleted' });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.put('/:id', isAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    if (req.body.title == "" || req.body.content =="") {
      res.status(400).json({ message: "Posts must have both a title and content."});
      return;
    }
    const postData = await Post.findOne({
      where: { id: req.params.id, user_id: req.session.user }
    })

    if (!postData) {
      res
        .status(400)
        .json({ message: 'Either this post does not exist or you do not have permissions to edit it.' });
      return;
    }

    const postEdit = await Post.update(req.body, {
      where: { id: req.params.id }
    })

    console.log(postData);
    console.log(req.body)

    res.status(200).json({ postEdit })

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})



module.exports = router;
