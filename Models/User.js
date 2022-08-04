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
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      //insert an email validator 
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
        // Array of _id values referencing the User model (self-reference)

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
  