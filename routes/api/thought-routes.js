const router = require('express').Router();

const {
    updateThought,
    addThought,
    deleteThought,
    getAllThoughts,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId> (POST)
router.route('/:userId').post(addThought);
router.route('/').get(getAllThoughts);
router.route('/:id').put(updateThought).delete(deleteThought);
// /api/thoughts/<userId>/<thoughttId> (DELETE)
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

    router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;