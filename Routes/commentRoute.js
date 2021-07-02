import express from "express";

// Router
const router = express.Router();

//Schema
import Comment from "../Model/Comment.js";
import Users from "../Model/Users.js";

// API Routes

//@route GET comments
//@desc get all comments in the server
//@access Public
router.get("/", (req, res) => {
  Comment.find()
    .sort({ timestamp: -1 })
    .then((comments) => res.status(200).send(comments))
    .catch((err) => res.status(501).send(err));
});

//@route GET comments/postID
//@desc get all comments from a post in the server
//@access Public
router.get("/:id", (req, res) => {
  Comment.find({ postID: req.params.id }, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(501).send({ msg: "Error in fetching comments" });
    }
  });
});

//@route POST comments
//@desc Add a comment into the comments Collection
//@access Public
router.post("/", (req, res) => {
  const { postID, name, email, message } = req.body;
  const newComment = new Comment({
    postID,
    name,
    email,
    message,
  });
  newComment
    .save()
    .then((comment) => res.status(201).send(console.log(comment)))
    .catch((err) => res.status(501).send(err));
  // res.send(req.body);
});

//@route DELETE comment
//@desc Delete a comment from the comments Collection
//@access Private
router.delete("/", (req, res) => {
  Comment.findById({ _id }, (err, data) => {
    if (!err) {
      res.status(200).send(data, "deleted");
    } else {
      res.status(501).send("Comment failed to delete");
    }
  });
});

export default router;
