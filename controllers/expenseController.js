const Expense = require("../models/Expense");

// Xarajat qo‘shish
const addExpense = async (req, res) => {
  const { amount, currency, amountInUZS, date, category, description, paidTo } =
    req.body;

  if (!amount || !currency || !amountInUZS || !date || !category) {
    return res
      .status(400)
      .json({ message: "Barcha majburiy maydonlarni to‘ldiring." });
  }

  try {
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
    console.error(error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

// Xarajatlarni olish
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

// Xarajatni yangilash
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, currency, amountInUZS, date, category, description, paidTo } =
    req.body;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Xarajat topilmadi." });
    }

    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Ruxsat yo'q." });
    }

    expense.amount = amount || expense.amount;
    expense.currency = currency || expense.currency;
    expense.amountInUZS = amountInUZS || expense.amountInUZS;
    expense.date = date || expense.date;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.paidTo = paidTo || expense.paidTo;

    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

// Xarajatni o‘chirish
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Xarajat topilmadi." });
    }

    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Ruxsat yo'q." });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Xarajat o‘chirildi." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
