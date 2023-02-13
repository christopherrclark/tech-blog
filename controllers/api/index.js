const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const commentsRoutes = require('./commentsRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
// router.use('/comments', commentsRoutes);
router.use('/posts', postRoutes);

module.exports = router;
