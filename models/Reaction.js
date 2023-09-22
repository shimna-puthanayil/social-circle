const { Schema, Types } = require("mongoose");

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
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
reactionSchema
  // Getter
  .get(function () {
    return this.createdAt.toLocaleDateString();
  });
// function format() {
//   return createdAt.toLocaleDateString();
// }

module.exports = reactionSchema;
