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

    const created = `${post.created_at.getFullYear()}${post.created_at.getMonth()}${post.created_at.getDate()}${post.created_at.getHours()}${post.created_at.getMinutes()}${post.created_at.getSeconds()}`;

    const updated = `${post.updated_at.getFullYear()}${post.updated_at.getMonth()}${post.updated_at.getDate()}${post.updated_at.getHours()}${post.updated_at.getMinutes()}${post.updated_at.getSeconds()}`;

    post.edited = (created !== updated);  

    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      edited: post.edited
    }

    const comments = commentData.map((comment) => { return comment.get({ plain: true })} );

    console.log(comments);

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
    loggedIn: req.session.loggedIn,
    edit: false
  }

  res.render('postform', { userInfo });

});

router.get('/edit/:id', isAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['title', 'content', 'created_at', 'updated_at']
    });
    const post = postData.get({ plain: true });
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      edit: true
    }

    const created = `${post.created_at.getFullYear()}${post.created_at.getMonth()}${post.created_at.getDate()}${post.created_at.getHours()}${post.created_at.getMinutes()}${post.created_at.getSeconds()}`;

    const updated = `${post.updated_at.getFullYear()}${post.updated_at.getMonth()}${post.updated_at.getDate()}${post.updated_at.getHours()}${post.updated_at.getMinutes()}${post.updated_at.getSeconds()}`;

    post.edited = (created !== updated);  
    
    res.render('postform', { post, userInfo });
  } catch {
    console.log(err);
    res.status(500).json(err);
  }

});


module.exports = router;
