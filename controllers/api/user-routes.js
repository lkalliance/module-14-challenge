const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/', async (req, res) => {
  // Creates a new user
  try {
    const newUser = req.body;

    // check to see if this username already exists
    const nameCheck = await User.findOne({ where: { username: req.body.username }})
    if ( nameCheck ) {
      res.status(400).json({ message: 'Username already in use. Please try again!' });
      return;
    }

    // check to see if this email already exists
    const mailCheck = await User.findOne({ where: { email: req.body.email }})
    if ( mailCheck ) {
      res.status(400).json({ message: 'Email already in use. Please try again!' });
      return;
    }

    const dbUserData = await User.create(newUser);
    const user = dbUserData.get({ plain: true })

    if ( !user.id ) {
      res.status(500).json({ message: 'User not created.'});
      return;
    }

    // everything cool, log this user in
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = user.id;
      req.session.username = user.username;

      res.status(200).json({ message: 'User created!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  // Logs the user in
  try {
    // look for the given username
    const userData = await User.findOne({
      where: { username: req.body.username }
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    // check the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    )

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // everything cool, log in
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
  // Logs the user out
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
