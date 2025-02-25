const Sale = require("../models/Sale");

const sellProduct = async (req, res) => {
  const { productId, quantity, warehouseId, paymentMethod } = req.body;

  if (!productId || !quantity || !warehouseId || !paymentMethod) {
    return res.status(400).json({ message: "Barcha maydonlar majburiy." });
  }

  try {
    const sale = new Sale({ productId, quantity, warehouseId, paymentMethod });
    await sale.save();
    res.status(201).json({ message: "Mahsulot muvaffaqiyatli sotildi", sale });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSalesHistory = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("productId")
      .populate("warehouseId");
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sellProduct,
  getSalesHistory,
};
