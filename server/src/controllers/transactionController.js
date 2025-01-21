const Transaction = require("../models/Transaction");
const { validationResult } = require("express-validator");

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.getAll();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

exports.getSpendingByCategory = async (req, res, next) => {
  try {
    const spending = await Transaction.getByCategory();
    res.json(spending);
  } catch (error) {
    next(error);
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

exports.processRefund = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    await Transaction.processRefund(transactionId);
    res.json({ message: "Refund processed successfully" });
  } catch (error) {
    next(error);
  }
};
