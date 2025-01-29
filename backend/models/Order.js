const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      selectedListwa: Object,
      selectedMocowanie: Object,
      width: Number,
      height: Number,
    },
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
