const { Schema, Types } = require("mongoose");

//require dateFormat to format the date of field 'createdAt'
const formatDate = require("../utils/dateFormat");

// reactionSchema - reaction field's subdocument schema in the Thought model.
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter method to format the timestamp on query
      get: function (date) {
        return formatDate(date);
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
