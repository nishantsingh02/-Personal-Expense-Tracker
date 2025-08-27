import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createExpense = async (req, res) => {
    try {
        const { name, amount, date, category } = req.body;
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const expense = await prisma.expenses.create({
            data: {
                name,
                amount,
                date: new Date(date),
                category,
                userId
            }
        });
        res.status(201).json(expense);
    }
    catch (error) {
        console.error("Error creating expense:", error);
        res.status(500).json({ error: "Failed to create expense" });
    }
};
