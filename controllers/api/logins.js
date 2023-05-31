const router = require('express').Router();

router.get('/login', async (req, res) => {
  console.log('login route hit');
  res.render('login');
});

module.exports = router;
