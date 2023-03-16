const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const postRoutes = require('./posts-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/posts', postRoutes);

module.exports = router;
