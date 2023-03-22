const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const isAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Render the home page
  try {
    // get the last ten posts
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
    // send the posts and the user info if any to the renderer
    res.render('homepage', { posts, userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dash', isAuth, async (req, res) => {
  // Render the user dashboard
  try {
    // get all posts by the logged-in user
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
    // check to see if there are any posts to render
    if (posts.length == 0) userInfo.noPosts = true;
    // send the posts and the user information to the renderer
    res.render('dashboard', { posts, userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // Renders the login page
  const userInfo = {
    username: req.session.username,
    userId: req.session.userId,
    loggedIn: req.session.loggedIn
  }
  // Probably no user info, but just in case something goes wrong
  res.render('login', { userInfo });
});

module.exports = router;
