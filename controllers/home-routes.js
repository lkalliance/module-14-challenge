const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const isAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ],
      limit: 10,
      order: [
        ['created_at', 'DESC']
      ]
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }

    res.render('homepage', { posts, userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dash', isAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user },
      attributes: [ 'id', 'title', 'created_at' ],
      order: [
        ['created_at', 'DESC']
      ]
    })

    const posts = postData.map((post) => post.get({ plain: true }));
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    }
    if (posts.length == 0) userInfo.noPosts = true;

    res.render('dashboard', { posts, userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  const userInfo = {
    username: req.session.username,
    userId: req.session.userId,
    loggedIn: req.session.loggedIn
  }
  res.render('login', { userInfo });
});

module.exports = router;
