//importing mongoose
const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //insert an email validator 
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      }
    },
    thoughts: {
        //Array of _id values referencing the Thought model
        type: String,
        required: true,
        enum: ['thought']
    },
    friends: {
        // Array of _id values referencing the User model (self-reference)
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
  });

  //Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
  UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
        (total, friends) => total + friends.length + 1,
        0
    );
  });

  const User = model('User', UserSchema);
  
  module.exports = User;
  