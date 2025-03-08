const Debt = require("../models/Debt");
const Rate = require("../models/usdModel");
const Sale = require("../models/Sale");

const createDebt = async (req, res) => {
  const { clientId, productId, quantity, currency, totalAmount, paymentMethod, sellingPrice, warehouseId, discount, dueDate } =
    req.body;

  if (!clientId || !productId || !quantity || !totalAmount || !warehouseId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newDebt = new Debt({
      clientId,
      productId,
      quantity,
      sellingPrice,
      warehouseId,
      totalAmount,
      currency,
      discount,
      paymentMethod,
      dueDate,
      remainingAmount: totalAmount,
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
  let { amount, currency } = req.body;

  try {
    const debt = await Debt.findById(id);
    const rateObj = await Rate.findOne(); // Valyuta kursini to‘g‘ri olish

    if (!debt) {
      return res.status(404).json({ message: "Debt not found" });
    }
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    if (!rateObj || isNaN(rateObj.rate)) {
      return res.status(400).json({ message: "Invalid exchange rate" });
    }

    const rate = rateObj.rate; // Endi `rate` son bo‘ladi

    debt.paymentHistory.push({ amount, currency });
    console.log(debt.currency);
    console.log(currency);

    if (debt.currency === currency) {
      debt.remainingAmount -= amount;
    } else if (debt.currency === "USD" && currency === "SUM") {
      debt.remainingAmount -= amount / rate;
    } else if (debt.currency === "SUM" && currency === "USD") {
      debt.remainingAmount -= amount * rate;
    } else {
      debt.remainingAmount -= amount;
    }

    if (debt.remainingAmount <= 0) {
      debt.status = "paid";
      debt.remainingAmount = 0;

      await Sale.create({
        clientId: debt.clientId,
        productId: debt.productId,
        quantity: debt.quantity,
        sellingPrice: debt.sellingPrice,
        warehouseId: debt.warehouseId,
        totalAmount: debt.totalAmount,
        currency: debt.currency,
        discount: debt.discount,
        paymentMethod: debt.paymentMethod,
        payment: {
          usd: debt?.paymentHistory?.filter(p => p.currency === "USD")?.reduce((a, b) => a + b?.amount, 0),
          sum: debt?.paymentHistory?.filter(p => p.currency === "SUM")?.reduce((a, b) => a + b?.amount, 0)
        },
      })

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
