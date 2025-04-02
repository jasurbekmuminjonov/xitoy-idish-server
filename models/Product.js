const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    name_partner: {
      type: String,
      default: "",
    },
    partner_number: {
      type: String,
      default: "",
    },
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
    quantity_per_package: {
      type: Number,
      default: 1,
    },
    total_kg: {
      type: Number,
      default: null,
    },
    kg_per_box: {
      type: Number,
      default: null,
    },
    kg_per_package: {
      type: Number,
      default: null,
    },
    kg_per_quantity: {
      type: Number,
      default: null,
    },
    package_quantity_per_box: {
      type: Number,
      default: 1,
    },
    isPackage: {
      type: Boolean,
      default: true,
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
      default: 1,
    },
    sellingPrice: {
      value: {
        type: Number,
      },
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: false, // Changed to optional
    },
    category: {
      type: String,
      required: false, // Changed to optional
    },
    size: {
      type: String,
      required: false, // Already optional
    },
    code: {
      type: String,
      required: false, // Already optional
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