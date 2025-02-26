const Sale = require("../models/Sale");
const Client = require("../models/Client");

const sellProduct = async (req, res) => {
  const {
    productId,
    quantity,
    warehouseId,
    paymentMethod,
    clientName,
    clientPhone,
    clientAddress,
  } = req.body;

  if (
    !productId ||
    !quantity ||
    !warehouseId ||
    !paymentMethod ||
    !clientName ||
    !clientPhone ||
    !clientAddress
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the client already exists
    let client = await Client.findOne({ phone: clientPhone });

    // If the client does not exist, create a new one
    if (!client) {
      client = new Client({
        name: clientName,
        phone: clientPhone,
        address: clientAddress,
      });
      await client.save();
    }

    // Create a new sale
    const sale = new Sale({
      productId,
      quantity,
      warehouseId,
      paymentMethod,
      clientId: client._id,
    });
    await sale.save();

    // Add the sale to the client's sales history
    client.sales.push(sale._id);
    await client.save();

    res.status(201).json({ message: "Product sold successfully", sale });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSalesHistory = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("productId")
      .populate("warehouseId")
      .populate("clientId");
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClientHistory = async (req, res) => {
  const { clientId } = req.params;

  try {
    const client = await Client.findById(clientId).populate({
      path: "sales",
      populate: {
        path: "productId warehouseId",
      },
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sellProduct,
  getSalesHistory,
  getClientHistory,
};
