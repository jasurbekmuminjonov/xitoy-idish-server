const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "credit"],
      required: true,
    },
    saleDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.models.Sale || mongoose.model("Sale", saleSchema);

module.exports = Sale;
