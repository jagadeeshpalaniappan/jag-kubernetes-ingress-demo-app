const Post = require("./post.model");

const postCtrl = {};

// getPost middleware
postCtrl.getPost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find Post" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
};

postCtrl.getAll = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

postCtrl.getById = (req, res) => {
  res.json(res.post);
};

postCtrl.create = async (req, res) => {
  const { title, body, authorId } = req.body;
  console.log("create: ", { title, body, authorId });

  const post = new Post({ title, body, authorId });
  try {
    const newPost = await post.save();
    res.status(201).json({ newPost });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

postCtrl.patch = async (req, res) => {
  if (req.body.title) {
    res.post.title = req.body.title;
  }
  if (req.body.body) {
    res.post.body = req.body.body;
  }
  if (req.body.authorId) {
    res.post.authorId = req.body.authorId;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

postCtrl.update = async (req, res) => {
  try {
    const updatedPost = await res.post.set(req.body);
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

postCtrl.delete = async (req, res) => {
  try {
    await res.post.deleteOne();
    res.json({ message: "Post has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

postCtrl.getById = (req, res) => {
  res.json(res.post);
};

module.exports = postCtrl;
