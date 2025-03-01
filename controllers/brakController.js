const Brak = require("../models/Brak");
const Product = require("../models/Product");

const addBrak = async (req, res) => {
  const { productId, quantity, reason } = req.body;

  if (!productId || !quantity || !reason) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Not enough quantity in stock." });
    }

    product.quantity -= quantity;
    await product.save();

    const newBrak = new Brak({
      productId,
      quantity,
      reason,
    });
    await newBrak.save();
    res.status(201).json(newBrak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrakHistory = async (req, res) => {
  try {
    const braks = await Brak.find().populate("productId", "name");
    res.status(200).json(braks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBrak,
  getBrakHistory,
};
