const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts (req, res) {
    Thought.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
          res.status(400).json(err);
        })
  },

  getThoughtByID({ params }, res) {
    Thought.findOne({_id: params.id })
    
    .select('-__v')
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
},

  updateThought({ params, body },res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },

  // add thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

    deleteThought({ params }, res) {
      Thought.findByIdAndDelete({ _id: params.id})
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id'});
            return
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },


  //adding a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },


  // remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndDelete(
      { _id: params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    )
      .then(deletedReaction => {
        if (!deletedReaction) {
        res.status(404).json({ message: 'No reaction with this id!' });
        return;
      }
        return User.findOneAndUpdate(
          { _id: params.UserId }, 
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;