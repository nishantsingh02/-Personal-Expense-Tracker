"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpense = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, amount, date, category } = req.body;
    if (!name || !amount || !category || !date) {
        res.status(400).json({ error: "All fields are required." });
    }
    try {
        const expense = yield prisma.expenses.create({
            data: {
                name,
                amount: parseFloat(amount),
                date: new Date(date),
                category,
            },
        });
        res.status(201).json({ message: "Content Added", expense });
        console.log("Content created successfully:", expense);
    }
    catch (error) {
        console.error("Error creating content:", error);
        res.status(500).json({ error: "Failed to create content." });
    }
});
exports.createExpense = createExpense;
