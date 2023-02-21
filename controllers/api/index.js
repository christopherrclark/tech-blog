const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentsRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/comments', commentsRoutes);
router.use('/posts', postRoutes);

module.exports = router;
