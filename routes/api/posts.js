const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

/* 
@route  POST api/posts
@desc   Create a post
@access Private
*/
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      let newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      newPost = new Post(newPost);
      await newPost.save();

      res.json(newPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

/* 
@route  GET api/posts
@desc   Get all posts
@access Private
*/
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/* 
@route  GET api/posts/:post_id
@desc   Get post by ID
@access Private
*/
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id });

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
});

/* 
@route  DELETE api/posts/:post_id
@desc   Delete post by ID
@access Private
*/
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id });

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    /** Check user owns post */
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
});

/* 
@route  PUT api/posts/like/:post_id
@desc   Like a post
@access Private
*/
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      res.status(400).json({ msg: "Post not found" });
    }
    /** Check if post was liked by logged in user */
    const likes = post.like.filter(like => {
      return like.user.toString() === req.user.id;
    });
    if (likes.length > 0) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.like.unshift({ user: req.user.id });
    await post.save();
    res.json(post.like);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

/* 
@route  PUT api/posts/unlike/:post_id
@desc   Unlike a post
@access Private
*/
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      res.status(400).json({ msg: "Post not found" });
    }
    /** Check if post is already liked */
    let likes = post.like.filter(like => {
      return like.user.toString() === req.user.id;
    });
    if (likes.length === 0) {
      return res.status(400).json({ msg: "Post not liked" });
    }

    /** Remove user from like array */
    likes = post.like.filter(like => {
      return like.user.toString() !== req.user.id;
    });
    post.like = likes;

    await post.save();
    res.json(post.like);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
