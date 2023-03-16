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

    res.render('homepage', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); 

// GET one post
router.get('/post/:id', isAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['title', 'content', 'created_at'],
      include: {
          model: User,
          attributes: ['username']
        }
    });
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      attributes: ['content', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    });
    const post = postData.get({ plain: true });

    const comments = commentData.map((comment) => { return comment.get({ plain: true })} );
    res.render('post', { post, comments });
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
  res.render('login');
});

module.exports = router;
