const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }

    ],
  },
  {
    timestamps: true,
  }
);

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
