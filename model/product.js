const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    rating: {
      rate: { type: Number },
      count: { type: Number },
    },
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("products", productSchema);
module.exports = product;
