const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },

    body: {
      type: String,
      required: true,
      minLength: 2,
    },
    published: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("post", postSchema);
