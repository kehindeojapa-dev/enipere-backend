import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  id: Number,
  Title: String,
  Author: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  Brief: String,
  package: String,
});

export default mongoose.model("post", postSchema);
