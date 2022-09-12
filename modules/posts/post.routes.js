const router = require("express").Router;
const { createPost, getAllPosts } = require("./post.controller");

const postRouter = router();

postRouter.route("/").get(getAllPosts).post(createPost);

module.exports = postRouter;
