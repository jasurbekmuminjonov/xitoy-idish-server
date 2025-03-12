const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // unit: {
    //   type: String,
    //   required: true,
    // },
    currency: {
      type: String,
      enum: ["USD", "SUM", ""],
    },
    purchasePrice: {
      value: {
        type: Number,
      },
    },
    image_url: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: null,
    },
    kg_quantity: {
      type: Number,
      default: null,
    },
    box_quantity: {
      type: Number,
      default: null,

    },
    package_quantity: {
      type: Number,
      default: null,

    },
    sellingPrice: {
      value: {
        type: Number,
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
    size: {
      type: String,
      required: true,
    },
    code: {
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
