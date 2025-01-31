const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: { 
    type: Number,
    unique: true,
  },
  items: [
    {
      id: String,
      name: String,
      color: String,
      mounting: String,
      imageLink: String,
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

orderSchema.pre("save", async function (next) {
    if (!this.orderNumber) {
      try {
        const lastOrder = await this.constructor.findOne().sort("-orderNumber");
        this.orderNumber = lastOrder && lastOrder.orderNumber ? lastOrder.orderNumber + 1 : 1;
      } catch (error) {
        return next(error);
      }
    }
    next();
});

// orderSchema.pre("save", async function (next) {
//     if (!this.orderNumber) {
//         const lastOrder = await this.constructor.findOne().sort("-orderNumber");
//         this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
//     }
//     next();
// });


module.exports = mongoose.model("Order", orderSchema);
