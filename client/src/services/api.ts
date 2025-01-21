import axios from "axios";
import { SpendingByCategory, Transaction } from "../types";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSpendingByCategory = async (): Promise<
  SpendingByCategory[]
> => {
  // This will be implemented when we have the backend ready
  return [
    { category: "Food", amount: 300, transactionCount: 5 },
    { category: "Transport", amount: 200, transactionCount: 8 },
    { category: "Entertainment", amount: 150, transactionCount: 3 },
    { category: "Bills", amount: 400, transactionCount: 4 },
    { category: "Shopping", amount: 250, transactionCount: 6 },
  ];
};

export const getTransactions = async (): Promise<Transaction[]> => {
  // This will be implemented when we have the backend ready
  return [];
};
