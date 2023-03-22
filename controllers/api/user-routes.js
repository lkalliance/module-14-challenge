const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    const nameCheck = await User.findOne({ where: { username: req.body.username }})
    if (nameCheck) {
      res.status(400).json({ message: 'Username already in use. Please try again!' });
      return;
    }
    const mailCheck = await User.findOne({ where: { email: req.body.email }})
    if (nameCheck) {
      res.status(400).json({ message: 'Email already in use. Please try again!' });
      return;
    }

    const dbUserData = await User.create(newUser);
    const user = dbUserData.get({ plain: true })

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = user.id;
      req.session.username = user.username;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username
      },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    )

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = userData.id;
      req.session.username = userData.username;

      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
