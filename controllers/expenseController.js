const Expense = require("../models/Expense");
const Setting = require("../models/usdModel"); // USD kurs olish uchun

// Bazadan USD kursni olish funksiyasi
const getUsdRate = async () => {
  const setting = await Setting.findOne();
  if (!setting) throw new Error("USD kurs topilmadi!");
  return setting.usdRate;
};

// Rasxod qo‘shish
const addExpense = async (req, res) => {
  const { amount, currency, date, category, description, paidTo } = req.body;

  if (!amount || !date || !category || !currency) {
    return res
      .status(400)
      .json({ message: "Barcha majburiy maydonlarni to‘ldiring." });
  }

  try {
    let amountInUZS = amount;

    if (currency === "USD") {
      const usdRate = await getUsdRate();
      amountInUZS = amount * usdRate;
    }

    const newExpense = new Expense({
      amount,
      currency,
      amountInUZS,
      date,
      category,
      description,
      paidTo,
      userId: req.user._id,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rasxodlar ro‘yxatini olish
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rasxod yangilash
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, currency, date, category, description, paidTo } = req.body;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Rasxod topilmadi." });
    }

    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Ruxsat etilmagan amaliyot." });
    }

    let amountInUZS = amount || expense.amountInUZS;
    if (currency === "USD") {
      const usdRate = await getUsdRate();
      amountInUZS = amount * usdRate;
    }

    expense.amount = amount || expense.amount;
    expense.currency = currency || expense.currency;
    expense.amountInUZS = amountInUZS;
    expense.date = date || expense.date;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.paidTo = paidTo || expense.paidTo;

    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rasxod o‘chirish
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Rasxod topilmadi." });
    }

    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Ruxsat etilmagan amaliyot." });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Rasxod o‘chirildi." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
