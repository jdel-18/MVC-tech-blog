const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "content", "title", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, attributes: ["id", "comment_text", "post_id", "user_id", "created_at"], include: { model: User, attributes: ["username"] } }
      ]
    });
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "content", "title", "created_at"],
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, attributes: ["id", "comment_text", "post_id", "user_id", "created_at"], include: { model: User, attributes: ["username"] } }
      ]
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    console.log("creating");
    const dbPostData = await Post.create({
      title: req.body.title,
      content: req.body.post_content,
      user_id: req.session.user_id
    });
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update(
      {
        title: req.body.title,
        content: req.body.post_content
      },
      {
        where: { id: req.params.id }
      }
    );
    if (!dbPostData[0]) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({
      where: { id: req.params.id }
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
