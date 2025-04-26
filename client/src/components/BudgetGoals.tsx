import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Backend_url = import.meta.env.VITE_PRODUCTION_BACKEND_URL;

interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
}

export const BudgetGoals: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [budgetLimit, setBudgetLimit] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchTransactions = async () => {
    try {
      // Cancel any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();
      
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Backend_url}/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal: abortControllerRef.current.signal
      });
      
      // Ensure we're setting an array
      const transactions = Array.isArray(response.data) ? response.data : [];
      setTransactions(transactions);
      setLoading(false);
    } catch (error) {
      // Only set error if it's not a cancellation
      if (!axios.isCancel(error)) {
        console.error('Error fetching transactions:', error);
        setError('Failed to fetch transactions');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    // Listen for new transaction events
    const handleTransactionAdded = () => {
      fetchTransactions(); // Fetch all transactions to ensure data consistency
    };

    window.addEventListener('transactionAdded', handleTransactionAdded as EventListener);

    // Cleanup function to cancel any ongoing requests and remove event listener
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      window.removeEventListener('transactionAdded', handleTransactionAdded as EventListener);
    };
  }, []);

  const calculateCategoryTotals = () => {
    // Ensure transactions is an array
    if (!Array.isArray(transactions)) {
      console.error('Expected transactions to be an array, got:', transactions);
      return {
        categoryTotals: [],
        totalSpent: 0,
        percentageOfBudget: 0
      };
    }

    const categoryTotals = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    const totalSpent = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
    const percentageOfBudget = budgetLimit > 0 ? (totalSpent / budgetLimit) * 100 : 0;

    return {
      categoryTotals: Object.entries(categoryTotals).map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / totalSpent) * 100
      })),
      totalSpent,
      percentageOfBudget
    };
  };

  const handleSaveBudget = () => {
    setIsEditing(false);
    localStorage.setItem('budgetLimit', budgetLimit.toString());
  };

  useEffect(() => {
    const savedBudget = localStorage.getItem('budgetLimit');
    if (savedBudget) {
      setBudgetLimit(parseFloat(savedBudget));
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const { categoryTotals, totalSpent, percentageOfBudget } = calculateCategoryTotals();

  return (
    <Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Budget Overview
          </CardTitle>
          <CardDescription>
            Track your spending against budget
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <div className="space-y-1">
                <Label htmlFor="budget">Monthly Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(parseFloat(e.target.value))}
                  className="w-32"
                />
              </div>
              <Button onClick={handleSaveBudget}>Save</Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Set Budget
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Budget Progress */}
          {budgetLimit > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Budget Progress</span>
                <span className="font-medium">
                  ${totalSpent.toLocaleString()} / ${budgetLimit.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    percentageOfBudget >= 90 ? 'bg-red-500' :
                    percentageOfBudget >= 70 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(percentageOfBudget, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Category Breakdown */}
          <div className="space-y-4">
            {categoryTotals.map(({ category, amount, percentage }) => (
              <div key={category} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-lg transition-colors">
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">{category}</span>
                  <span className="font-medium">
                    ${amount.toLocaleString()} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-violet-500 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 