const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["UZS", "USD"], // Valyuta turi: UZS yoki USD
      required: true,
    },
    amountInUZS: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    paidTo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt va updatedAt maydonlari avtomatik qo‘shiladi
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
