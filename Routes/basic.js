import express from "express";
import path from "path";
import { v4 } from "uuid";
import mammoth from "mammoth";

const app = express();
app.use(express.static("Public"));
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
  const detail = JSON.parse(req.body.details);
  const author = req.body.author;
  detail.mainID = v4();

  const __dirname = path.resolve();
  const url = req.protocol + "://" + req.get("host");

  const doc = req.files.doc;
  const cover = req.files.cover;
  const image = req.files.image;

  // Move doc(+cover) or images to the public folder
  // mv() method places the file inside public directory
  // if (doc && cover) {
  console.log("Uploading");
  if (doc && cover) {
    doc.mv(`${__dirname}/Public/${detail.mainID + doc.name}`, function (err) {
      if (err) {
        return res.status(500).send({ msg: "Error occured" });
      }
    });

    mammoth
      .convertToHtml({ path: `Public/${detail.mainID + doc.name}` })
      .then(function (result) {
        const html = result.value;
        const message = result.message;

        const newPost = new Post({
          id: detail.mainID,
          Author: author,
          Title: detail.title,
          format: detail.format,
          Brief: detail.brief,
          // doc: url + "/Public/" + detail.mainID + doc.name,
          doc: html,
          cover: url + "/" + detail.mainID + cover.name,
          image: "",
        });

        newPost
          .save()
          .then((post) => res.status(201).send(`${post}, addition successful`))
          .catch((err) => res.status(501).send(`Post addition failed, ${err}`));
      })
      .done();

    cover.mv(
      `${__dirname}/Public/${detail.mainID + cover.name}`,
      function (err) {
        if (err) {
          return res.status(500).send({ msg: "Error occured" });
        }
      }
    );
  }

  if (image) {
    image.mv(
      `${__dirname}/Public/${detail.mainID + image.name}`,
      function (err) {
        if (err) {
          return res.status(500).send({ msg: "Error occured" });
        }
      }
    );

    const newPost = new Post({
      id: detail.mainID,
      Author: author,
      Title: detail.title,
      format: detail.format,
      Brief: detail.brief,
      doc: "",
      cover: "",
      image: url + "/" + detail.mainID + image.name,
    });
    newPost
      .save()
      .then((post) => res.status(201).send(`${post}, addition successful`))
      .catch((err) => res.status(501).send(`Post addition failed, ${err}`));
  }
});

//@route GET server
//@desc fetch a post
//@access Public
router.get("/post/:id", (req, res) => {
  Post.findById({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(404).send("Post not found");
    }
  });
});

//@route GET server/username
//@desc fetch posts by username
//@access Private
router.get("/posts/username/:id", (req, res) => {
  const usernameID = req.params.id;
  Post.find({ Author: usernameID })
    .sort({ timestamp: -1 })
    .then((posts) => res.status(200).send(posts))
    .catch((err) => res.status(501).send({ msg: "Posts can't be fetched" }));
});

//@route DELETE server/post
//@desc delete a post
//@access Private
router.delete("/post/:id", (req, res) => {
  Post.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.status(200).send(`${data}, delete successful`);
    } else {
      res.status(501).send("Post failed to delete");
    }
  });
});

export default router;
