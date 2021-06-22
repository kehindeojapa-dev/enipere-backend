import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
  bio: {
    type: String,
    default: "Am a writer",
  },
  profileImg: {
    type: String,
    default: "image not set yet",
  },
});

export default mongoose.model("user", UserSchema);
