const router = require('express').Router();

const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId> (POST)
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughttId> (DELETE)
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeReaction)

    router.route('/:userId:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;