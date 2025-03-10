const Sale = require("../models/Sale");

const sellProduct = async (req, res) => {
  const { clientId, productId, quantity, warehouseId, currency, sellingPrice, discount, paymentMethod } =
    req.body;

  if (!clientId || !productId || !quantity || !warehouseId || !paymentMethod) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const newSale = new Sale({
      clientId,
      productId,
      quantity,
      sellingPrice,
      payment: currency === "USD" ? { usd: sellingPrice * quantity, sum: 0 } : {
        usd: 0, sum: sellingPrice * quantity
      },
      warehouseId,
      paymentMethod,
      discount
    });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSalesHistory = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("clientId", "name")
      .populate("productId", "name purchasePrice.value sellingPrice.value code size currency")
      .populate("warehouseId", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClientHistory = async (req, res) => {
  const { clientId } = req.params;

  try {
    const sales = await Sale.find({ clientId })
      .populate("productId", "name purchasePrice.value sellingPrice.value")
      .populate("warehouseId", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sellProduct,
  getSalesHistory,
  getClientHistory,
};
