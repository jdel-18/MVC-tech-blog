const router = require('express').Router();

router.get('/login', async (req, res) => {
  console.log('login route hit');
  res.send('login');
});

module.exports = router;
