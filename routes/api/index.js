const router = require('express').Router();
const userRoutes = require('./user-route');
const reactionRoutes = require('./reaction-routes');


// add prefix of `/users` to routes created in `users-routes.js`
router.use('/users', userRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;