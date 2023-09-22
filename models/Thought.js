const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
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
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate() + 1;
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        const formattedDate = dd + "/" + mm + "/" + yyyy;
        return formattedDate;
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
    },
    id: false,
  }
);
// function format(createdAt) {
//   return createdAt.getDate() + createdAt.getMonth() + createdAt.getFullYear();
// }

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
