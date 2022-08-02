//importing mongoose
const { Schema, model } = require('mongoose');
//import formater for the date
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    // Use Mongoose's ObjectId data type
    // Default value is set to a new ObjectId
    reactionId: {

    },
    reactionBody: {
        type: String,
        required: true,
        // 280 character maximum
        min: [1, 'Must be between 1 and 280 characters'],
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //Use a getter method to format the timestamp on query
        get: createdAtVal => dateFormat(createdAtVal)
      }
})

// Schema Settings
// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.