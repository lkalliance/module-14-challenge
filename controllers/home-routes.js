const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const isAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  console.log("I'm on the home page");
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); 

// GET one post
router.get('/:id', isAuth, async (req, res) => {
  console.log("I'm reading a post");
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
    });
    console.log(postData);
    const post = postData.get({ plain: true });
    res.render('post', { post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
// TODO: Replace the logic below with the custom middleware
router.get('/painting/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the painting
    try {
      const dbPaintingData = await Painting.findByPk(req.params.id);

      const painting = dbPaintingData.get({ plain: true });

      res.render('painting', { painting, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/login', (req, res) => {
  console.log("I'm on the login page");
  res.render('login');
});

module.exports = router;
