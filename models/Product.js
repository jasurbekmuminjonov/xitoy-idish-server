const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "SUM"],
    },
    purchasePrice: {
      value: {
        type: Number,
        required: true,
      },
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    sellingPrice: {
      value: {
        type: Number,
        required: true,
      },
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    barcode: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
