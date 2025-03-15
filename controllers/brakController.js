const Brak = require("../models/Brak");
const Product = require("../models/Product");

const addBrak = async (req, res) => {
  const { productId, quantity, reason, unit } = req.body;

  if (!productId || !quantity || !reason) {
    return res.status(400).json({ message: "Barcha maydonlar majburiy" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    product.box_quantity -= (quantity / product.package_quantity_per_box / product.quantity_per_package).toFixed(2);
    product.package_quantity -= (quantity / product.quantity_per_package).toFixed(2);
    product.quantity -= quantity;
    product.total_kg -= (quantity * (unit === "quantity" ? product.kg_per_quantity : unit === "package_quantity" ? product.kg_per_package : product.kg_per_box)).toFixed(2);
    await product.save();

    const newBrak = new Brak({
      productId,
      quantity,
      reason,
      unit
    });
    await newBrak.save();
    res.status(201).json(newBrak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrakHistory = async (req, res) => {
  try {
    const braks = await Brak.find().populate("productId", ["name", "size", "unit", "package_quantity_per_box", "quantity_per_package"]);
    console.log(braks);

    res.status(200).json(braks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBrak,
  getBrakHistory,
};
