const Photo = require("./photo.model");

const photoCtrl = {};

// getPhoto middleware
photoCtrl.getPhoto = async (req, res, next) => {
  let photo;
  try {
    photo = await Photo.findById(req.params.id);
    if (photo == null) {
      return res.status(404).json({ message: "Cannot find Photo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.photo = photo;
  next();
};

photoCtrl.getAll = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

photoCtrl.getById = (req, res) => {
  res.json(res.photo);
};

photoCtrl.create = async (req, res) => {
  const photo = new Photo({
    title: req.body.title,
    authorId: req.body.authorId,
  });
  try {
    const newPhoto = await photo.save();
    res.status(201).json({ newPhoto });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

photoCtrl.patch = async (req, res) => {
  if (req.body.title) {
    res.photo.title = req.body.title;
  }
  if (req.body.authorId) {
    res.photo.authorId = req.body.authorId;
  }
  try {
    const updatedPhoto = await res.photo.save();
    res.json(updatedPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

photoCtrl.update = async (req, res) => {
  try {
    const updatedPhoto = await res.photo.set(req.body);
    res.json(updatedPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

photoCtrl.delete = async (req, res) => {
  try {
    await res.photo.deleteOne();
    res.json({ message: "Photo has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

photoCtrl.getById = (req, res) => {
  res.json(res.photo);
};

module.exports = photoCtrl;
