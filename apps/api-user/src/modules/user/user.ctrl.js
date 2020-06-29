const User = require("./user.model");

const userCtrl = {};

// getUser middleware
userCtrl.getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

userCtrl.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userCtrl.getById = (req, res) => {
  res.json(res.user);
};

userCtrl.create = async (req, res) => {
  const { firstName, lastName, email, mobile } = req.body;
  const user = new User({ firstName, lastName, email, mobile });
  try {
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

userCtrl.patch = async (req, res) => {
  const updatedUser = { ...res.user, ...req.body };
  try {
    const updatedUser = await updatedUser.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

userCtrl.update = async (req, res) => {
  try {
    const updatedUser = await res.user.set(req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

userCtrl.delete = async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

userCtrl.getById = (req, res) => {
  res.json(res.user);
};

module.exports = userCtrl;
