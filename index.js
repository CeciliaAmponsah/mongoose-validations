const express = require("express");
const postRouter = require("./modules/posts/post.routes");
const { dbConnect } = require("./config/dbconnect");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200)("welcome to my server.use /posts to get all posts");
});

app.use("/posts", postRouter);

async function start() {
  await dbConnect();

  app.listen(4000, () => {
    console.log("server listening on http://localhost:4000");
  });
}

start();
