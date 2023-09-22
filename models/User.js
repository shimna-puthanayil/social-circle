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
        validator: function (v) {
          return /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
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
