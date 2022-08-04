//importing mongoose
const { Schema, model, Types } = require('mongoose');
//import formater for the date
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema ({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  },
  id: false
})

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        //Must be between 1 and 280 characters
        min: [1, 'Must be between 1 and 280 characters'],
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //Use a getter method to format the timestamp on query
        get: createdAtVal => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        Required: true
      },
      //reactions??
      reactions: [
        reactionSchema
      ],
}, {
  toJSON: {
    virtuals: true
  },
  id: false
});

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce(
        (total, reactions) => total + reactions.length + 1,
        0
    );
  });


  const Thought = model('Thought', ThoughtSchema);

  module.exports = Thought;
  