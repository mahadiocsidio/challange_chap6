const router = require('express').Router();
const { createPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/post.controller');
const { imageFilter } = require('../libs/multer');

router.post('/posts/', imageFilter.single('image'), createPost);
router.get('/posts/', getPosts);
router.get('/posts/:id', getPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

module.exports = router;