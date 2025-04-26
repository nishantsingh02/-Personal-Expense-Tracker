import React, { useState, useEffect } from "react";
import api from "../utils/axios";

interface Transaction {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
}

export const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(5);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/transactions');
      // Ensure we're setting an array
      const transactions = Array.isArray(response.data) ? response.data : [];
      console.log("Fetched transactions:", transactions);
      setTransactions(transactions);
      setError(null);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    // Listen for new transaction events
    const handleTransactionAdded = () => {
      fetchTransactions(); // Fetch all transactions to ensure data consistency
    };

    window.addEventListener('transactionAdded', handleTransactionAdded as EventListener);

    return () => {
      window.removeEventListener('transactionAdded', handleTransactionAdded as EventListener);
    };
  }, []);

  // Update the transaction count in the parent component
  useEffect(() => {
    const countElement = document.querySelector('.transaction-count');
    if (countElement) {
      countElement.textContent = `${transactions.length} ${transactions.length === 1 ? 'transaction' : 'transactions'}`;
      console.log("Updated transaction count:", transactions.length);
    }
  }, [transactions]);

  const TransactionItem = ({ transaction, index }: { transaction: Transaction, index: number }) => (
    <div 
      className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 ${index === 0 ? 'shadow-md' : ''}`}
    >
      <div className="col-span-5 truncate">
        <h3 className="font-medium text-gray-900 dark:text-white truncate">{transaction.description}</h3>
      </div>
      <div className="col-span-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {transaction.category}
        </span>
      </div>
      <div className="col-span-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(transaction.date).toLocaleDateString()}
        </p>
      </div>
      <div className="col-span-2 text-right">
        <span className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          ${transaction.amount.toLocaleString()}
        </span>
      </div>
    </div>
  );

  const LoadMoreButton = () => (
    <button
      onClick={() => setDisplayCount(prev => prev + 5)}
      className="w-full mt-6 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
    >
      Load More Transactions
    </button>
  );

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-2">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400">No transactions available</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-4">
                <div className="col-span-5">Description</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
              
              <div className="space-y-4">
                {Array.isArray(transactions) && transactions.slice(0, displayCount).map((transaction, index) => (
                  <TransactionItem key={transaction.id} transaction={transaction} index={index} />
                ))}
              </div>
              
              {displayCount < transactions.length && <LoadMoreButton />}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/*import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

interface Transaction {
  id: number;
  name: string;
  category: string;
  date: string;
  amount: number;
}

const Backend_url = "http://localhost:5000";

export const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(5);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${Backend_url}/api/transactions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Transactions</h2>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-2">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400">No transactions available</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-4">
                <div className="col-span-5">Description</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
              
              {transactions.slice(0, displayCount).map((transaction, index) => (
                <div 
                  key={transaction.id} 
                  className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600/50 dark:hover:to-gray-700/50 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 ${index === 0 ? 'shadow-sm' : ''}`}
                >
                  <div className="col-span-5">
                    <h3 className="font-medium text-gray-900 dark:text-white">{transaction.name}</h3>
                  </div>
                  <div className="col-span-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {transaction.category}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      ${transaction.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              
              {displayCount < transactions.length && (
                <button
                  onClick={() => setDisplayCount(prev => prev + 5)}
                  className="w-full mt-6 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Load More Transactions
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}*/