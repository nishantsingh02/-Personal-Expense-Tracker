export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface SpendingByCategory {
  category: string;
  amount: number;
  transactionCount: number;
}
