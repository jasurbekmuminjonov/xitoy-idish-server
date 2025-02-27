const Debt = require("../models/Debt");

const createDebt = async (req, res) => {
  const { clientId, productId, quantity, totalAmount, paymentMethod, discount, dueDate } =
    req.body;

  if (!clientId || !productId || !quantity || !totalAmount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newDebt = new Debt({
      clientId,
      productId,
      quantity,
      totalAmount,
      discount,
      paymentMethod,
      dueDate,
      remainingAmount: totalAmount, // Ensure remainingAmount is set
    });
    await newDebt.save();
    res.status(201).json(newDebt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDebtsByClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const debts = await Debt.find({ clientId }).populate("productId");
    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const payDebt = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const debt = await Debt.findById(id);

    if (!debt) {
      return res.status(404).json({ message: "Debt not found" });
    }

    debt.paymentHistory.push({ amount });
    debt.remainingAmount -= amount;

    if (debt.remainingAmount <= 0) {
      debt.status = "paid";
      debt.remainingAmount = 0;
    }

    await debt.save();

    res.status(200).json(debt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDebtors = async (req, res) => {
  try {
    const debtors = await Debt.find({ status: "pending" })
      .populate("clientId")
      .populate("productId");
    res.status(200).json(debtors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDebt,
  getDebtsByClient,
  payDebt,
  getAllDebtors,
};
