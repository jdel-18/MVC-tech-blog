const { User, Post, Comment } = require('./models');
const router = require('express').Router();
const withAuth = require('./utils/auth.js');

router.post('/new', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        });
        res.redirect('/api/dashboard')
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});

router.post('/update/', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: {
                id: req.body.postId
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.redirect('/api/dashboard');
    } catch(err) {
            console.log(err);

            res.status(500).json(err);
        }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.log(err);

        res.status(500).json(err);
    }
});

module.exports = router;