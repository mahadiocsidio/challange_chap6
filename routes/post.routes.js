const router = require('express').Router();
const { createPost, getAllPost, getPost, updatePost, deletePost } = require('../controllers/posting.controllers');
const { imageFilter } = require('../libs/multer');

router.post('/posts/', imageFilter.single('image'), createPost);
router.get('/posts/', getAllPost);
router.get('/posts/:id', getPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

module.exports = router;