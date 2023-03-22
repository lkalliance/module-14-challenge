const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const isAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // Render the complete list of all posts, ever
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['id', 'username']
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
      loggedIn: req.session.loggedIn,
      showUser: false
    }
    // send list of posts and user info to the renderer
    res.render('postlist', { posts, userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/list/:user', async (req, res) => {
  // Render a list of all posts by a specific user
  try {
    const postData = await Post.findAll({
      where: { user_id: req.params.user },
      attributes: ['id', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ],
      order: [
        ['created_at', 'DESC']
      ]
    });
    // in case of no posts, get the username directly
    const userData = await User.findOne({
      where: { id: req.params.user },
      attributes: ['username']
    })

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    const user = userData.get({ plain: true });
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      showUser: user
    }
    // send the posts and the user info to the renderer
    res.render('postlist', { posts, userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/view/:id', async (req, res) => {
  // Render one post to view
  try {
    // get the post
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['title', 'content', 'created_at', 'updated_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    });
    const post = postData.get({ plain: true });

    // get the comments on the post
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
    const comments = commentData.map((comment) => { return comment.get({ plain: true })} );

    // check to see if the post has ever been edited (strict compare didn't work)
    const created = `${post.created_at.getFullYear()}${post.created_at.getMonth()}${post.created_at.getDate()}${post.created_at.getHours()}${post.created_at.getMinutes()}${post.created_at.getSeconds()}`;

    const updated = `${post.updated_at.getFullYear()}${post.updated_at.getMonth()}${post.updated_at.getDate()}${post.updated_at.getHours()}${post.updated_at.getMinutes()}${post.updated_at.getSeconds()}`;

    post.edited = (created !== updated);  

    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      edited: post.edited
    }
    // send posts, comments and user info to the renderer
    res.render('post', { post, comments, userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create', isAuth, async (req, res) => {
  // Render the create post page
  const userInfo = {
    username: req.session.username,
    userId: req.session.userId,
    loggedIn: req.session.loggedIn,
    edit: false
  }
  // send user info to the renderer
  res.render('postform', { userInfo });
});

router.get('/edit/:id', isAuth, async (req, res) => {
  // Render the edit post page
  try {
    // make sure the requested post is by the logged-in user
    const postData = await Post.findOne({
      where: { id: req.params.id, user_id: req.session.user },
      attributes: ['id', 'title', 'content', 'created_at', 'updated_at']
    });
    const post = postData.get({ plain: true });

    // check to see if the post has ever been edited (strict compare didn't work)
    const created = `${post.created_at.getFullYear()}${post.created_at.getMonth()}${post.created_at.getDate()}${post.created_at.getHours()}${post.created_at.getMinutes()}${post.created_at.getSeconds()}`;

    const updated = `${post.updated_at.getFullYear()}${post.updated_at.getMonth()}${post.updated_at.getDate()}${post.updated_at.getHours()}${post.updated_at.getMinutes()}${post.updated_at.getSeconds()}`;

    post.edited = (created !== updated); 
    
    const userInfo = {
      username: req.session.username,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      edit: true
    }
    // send the post and user info to the renderer
    res.render('postform', { post, userInfo });
  } catch {
    console.log(err);
    res.status(500).json(err);
  }

});


module.exports = router;
