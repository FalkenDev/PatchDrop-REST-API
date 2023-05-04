const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  // each comment can only relates to one blog, so it's not in array
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  text: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  comments: [commentSchema],
});

postSchema.virtual("url").get(function () {
  return "/post/" + this._id;
});

module.exports = mongoose.model("Post", postSchema);
