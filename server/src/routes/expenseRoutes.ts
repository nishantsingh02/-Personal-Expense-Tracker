import express, { Request, Response } from 'express';
import { createExpense } from "../controllers/expenseController";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

router.post("/content", createExpense);

const prisma = new PrismaClient();


// Routes to get all expenses (transactions)
router.get("/transactions", async (req:Request, res:Response) => {
  try {
    const transactions = await prisma.expenses.findMany(); // Fetchs all transactions from the expenses table
    res.status(200).json(transactions); // Sends the transactions back to the frontend
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
});


export default router;
