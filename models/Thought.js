const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const formattedDate = require("../utils/dateFormat");
//Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 0,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (date) {
        return formattedDate(date);
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

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
