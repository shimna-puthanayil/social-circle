const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

//require dateFormat to format the date of field 'createdAt'
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
      // getter method to format the timestamp on query
      get: function (date) {
        return formattedDate(date);
      },
    },
    username: {
      type: String,
      required: true,
    },

    //subdocument schema
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
