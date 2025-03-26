import React, {useEffect, useState, useCallback, useRef} from 'react';
import SpendingChart from '../Charts/SpendingChart';
import { Button } from '../Icons/Button';
import { Plusicon } from '../Icons/Plusicon';
import { CreateContentModel } from '../CreateContentModel';
import axios from "axios";
const Backend_url = process.env.REACT_APP_BACKEND_URL;

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [modelOpen, setModelOpen] = React.useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Added AbortController for cleanup
  const abortControllerRef = useRef<AbortController>();
  
  // Added Cache control headers for API requests
  const cacheConfig = {
    headers: {
      'Cache-Control': 'max-age=300', 
    }
  };

  // Memoize fetch function to prevent unnecessary recreations
  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      // Cancel any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      const response = await axios.get(
        `${Backend_url}/api/transactions`,
        {
          ...cacheConfig,
          signal: abortControllerRef.current.signal,
          timeout: 10000 
        }
      );
      
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      if (axios.isCancel(err)) {
        return; 
      }
      console.error("Error fetching transactions:", err);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array to prevent re-fetching on every render

  useEffect(() => {
    fetchTransactions();
    
    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchTransactions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Personal Expense Tracker
          </h1>

          <Button
            onClick={() => setModelOpen(true)}
            variant="primary"
            text="Add Expense"
            startIcon={<Plusicon />}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 rounded-full px-6"
          />
        </div>

        <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />
    
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200/50">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Balance</h2>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              ${(24500 + transactions.reduce((acc, transaction) => acc - transaction.amount, 0)).toLocaleString()}
            </p>
          </div>
          
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200/50">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Monthly Spending</h2>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              ${transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toLocaleString()}
            </p>
          </div>
          
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200/50">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Savings Goal</h2>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">35%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200/50">
            <h2 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6">
              Spending by Category
            </h2>
            <SpendingChart />
          </div>
          
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200/50">
            <h2 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6">
              Recent Transactions
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {isLoading ? (
              <p className="text-gray-500 text-center py-4">Loading transactions...</p>
            ) : (
              <div className="space-y-3">
                {transactions.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No transactions available</p>
                ) : (
                  transactions.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600/50 dark:hover:to-gray-700/50 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{transaction.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        ${transaction.amount.toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;