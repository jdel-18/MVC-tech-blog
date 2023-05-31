const router = require('express').Router();
const { Post } = require('./models'); 

router.get('/', async (req, res) => {
  const postData = await Post.findAll(); 

  if (!postData) return res.status(404).json({ data: null });

  const posts = postData.map((post) => post.get({ plain: true }));

  res.render('homepage', { posts });
});

router.get('/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id); 

  const post = postData.get({ plain: true });

  res.render('post', post);
});

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
