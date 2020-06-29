const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
