const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
//Schema to create Thought model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    minLength: 0,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: format,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});
function format(createdAt) {
  return createdAt.getDate() + createdAt.getMonth() + createdAt.getFullYear();
}

// Create a virtual property `reactionCount` that gets the number of reactions associated with a thought
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });
// Initialize the Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
