const router = require('express').Router();
const apiRoutes = require('./api');
const loginRoutes = require('./logins');
const commentRoutes = require('./api/commentRoutes');

router.use('/api', apiRoutes);
router.use('login', loginRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
