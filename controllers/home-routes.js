const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const isAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
      limit: 5
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

router.get('/login', (req, res) => {
  const userInfo = {
    username: req.session.username,
    userId: req.session.userId,
    loggedIn: req.session.loggedIn
  }
  res.render('login', { userInfo });
});

module.exports = router;
