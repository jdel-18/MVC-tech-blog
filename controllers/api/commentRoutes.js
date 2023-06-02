const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll();
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    if (req.session) {
      const dbCommentData = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
      });
      res.json(dbCommentData);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
