const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    email: {
      type: String,
      Required: true,
    },
    password: {
      type: String,
      Required: true,
    },
    role: {
      type: String,
      Required: "blog",
    },
  },
  { timestamps: true }
)

const BlogModel = mongoose.model("blog", BlogSchema);

module.exports = BlogModel;