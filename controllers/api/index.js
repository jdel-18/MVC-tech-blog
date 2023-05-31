const router = require('express').Router();
const apiRoutes = require('./api');
const loginRoutes = require('./logins');

router.use('/api', apiRoutes);
router.use(loginRoutes);

module.exports = router;
