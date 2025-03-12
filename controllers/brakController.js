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
    if (product[unit] === null) {
      return res.status(400).json({ message: "Mahsulot yetarli emas" });
    }
    if (product[unit] < quantity) {
      return res.status(400).json({ message: "Mahsulot yetarli emas" });
    }
    product[unit] -= quantity;
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
    const braks = await Brak.find().populate("productId", ["name", "size", "unit"]);
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
