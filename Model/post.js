import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  id: String,
  Title: String,
  Author: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  Brief: String,
  doc: String,
  docPath: String,
  cover: String,
  coverPath: String,
  image: String,
  imagePath: String,
});

export default mongoose.model("post", postSchema);
