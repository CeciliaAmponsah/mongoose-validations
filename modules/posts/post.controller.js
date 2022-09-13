const Post = require("./post.model");
exports.getAllPosts = async (reg, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
};

exports.createPost = async (req, res) => {
  const { title, body, published } = req.body;

  const post = await Post.create({
    title,
    body,
    published,
  });

  res.status(201).json({ post });
};

exports.getSinglePost = async (req, res) => {
  //const postId = req.params.postId;
  const { postId } = req.params;
  const post = await post.findById(postId);
  res.status(200).json({ post });
};

exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const post = await post.findByIdAndUpdate(
    postId,
    { ...req.body },
    { new: true }
  );
  res.status(200).json({ post });
};
exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  await post.findByIdAndDelete(postId);
  console.log(oost);
  res.status(200).json({ msg: "post deleted sucessfully." });
};
