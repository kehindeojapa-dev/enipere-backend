import express from "express";

const router = express.Router();

// Get Schema
import Post from "../Model/post.js";

// Routes

//@route GET server
//@desc get all current posts in the server
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ timestamp: -1 })
    .then((posts) => res.status(200).send(posts))
    .catch((err) => res.status(404).send(`Error, fetching posts, ${err}`));
});

//@route POST server
//@desc add a new post
//@access Private
router.post("/", (req, res) => {
  const newPost = new Post({
    id: req.body.id,
    Author: req.body.author,
    Title: req.body.title,
    Package: req.body.package,
    Brief: req.body.brief,
  });
  newPost
    .save()
    .then((item) => res.status(201).send(`${item}, addition successful`))
    .catch((err) => res.status(501).send(`Post addition failed, ${err}`));
});

//@route DELETE server/post
//@desc delete a post
//@access Private
router.delete("/post/:id", (req, res) => {
  Post.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.status(200).send(`${data}, delete successful`);
    } else {
      res.status(501).send("Item failed to delete");
    }
  });
});

export default router;
