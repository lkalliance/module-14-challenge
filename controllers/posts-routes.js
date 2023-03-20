const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const isAuth = require('../utils/auth');

// GET all posts complete listing
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
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

    res.render('postlist', { posts, userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/view/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['title', 'content', 'created_at', 'updated_at'],
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
    post.edited = (!post.created_at == post.updated_at);
    console.log(post);
    
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
    }
    const comments = commentData.map((comment) => { return comment.get({ plain: true })} );
    res.render('post', { post, comments, userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create', isAuth, async (req, res) => {
  const userInfo = {
    username: req.session.username,
    userId: req.session.userId,
    loggedIn: req.session.loggedIn
  }

  res.render('postform', { userInfo });

});

router.get('/edit/:id', isAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['title', 'content']
    });
    const post = postData.get({ plain: true });
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      edit: true
    }
    
    res.render('postform', { post, userInfo });
  } catch {
    console.log(err);
    res.status(500).json(err);
  }

});


module.exports = router;
