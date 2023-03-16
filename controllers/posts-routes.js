const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const isAuth = require('../utils/auth');

// GET all posts complete listing
router.get('/', async (req, res) => {
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

    res.render('postlist', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/:id', isAuth, async (req, res) => {
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