import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createExpense = async (req: Request, res: Response) => {
  const { name, amount, date, category } = req.body;

  if (!name || !amount || !category || !date) {
    res.status(400).json({ error: "All fields are required." });
  }

  try {
    const expense = await prisma.expenses.create({    // Creates the expense using Prisma
      data: {
        name,
        amount: parseFloat(amount),
        date: new Date(date),
        category,
      },
    });
     res.status(201).json({ message: "Content Added", expense });
     console.log("Content created successfully:", expense);
  } catch (error) {
    console.error("Error creating content:", error);
    res.status(500).json({ error: "Failed to create content." });
  }
};
