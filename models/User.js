const { Schema, model } = require("mongoose");

// Schema to create a User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        //validates the email address
        validator: () => Promise.resolve(false),
        message: "Email validation failed",
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the number of friends associated with a user
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });
// Initialize the User model
const User = model("user", userSchema);

module.exports = User;
