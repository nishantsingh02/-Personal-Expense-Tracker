const express = require("express");
const { body } = require("express-validator");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.get("/", transactionController.getTransactions);
router.get("/by-category", transactionController.getSpendingByCategory);

router.post(
  "/",
  [
    body("amount").isFloat({ min: 0.01 }),
    body("category").notEmpty(),
    body("type").isIn(["payment", "refund"]),
    body("description").optional(),
  ],
  transactionController.createTransaction
);

router.post("/refund/:transactionId", transactionController.processRefund);

module.exports = router;
