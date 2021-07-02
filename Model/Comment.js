import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  postID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "Anonymous",
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("comment", commentSchema);
