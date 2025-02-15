import React, {useEffect,useState} from 'react';
import SpendingChart from '../Charts/SpendingChart';
import  { Button }  from '../Icons/Button';
import { Plusicon} from '../Icons/Plusicon';
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
   
     // Fetch transactions from the backend
     useEffect(() => {
       const fetchTransactions = async () => {
         try {
           const response = await axios.get(`${Backend_url}/api/transactions`);
           setTransactions(response.data); // Set the transactions data from the backend
         } catch (err) {
           console.error("Error fetching transactions:", err);
           setError("Failed to fetch transactions.");
         }
       };
   
       fetchTransactions();
     }, []); // Empty dependency array 


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
            Personal Expense Tracker
          </h1>

          <Button
            onClick={() => setModelOpen(true)}
            variant="primary"
            text="Add Expense"
            startIcon={<Plusicon />}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 rounded-full px-6 transform hover:scale-105"
          />
        </div>

        <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />
    
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Summary Cards */}
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Balance</h2>
            <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              ${(24500 + transactions.reduce((acc, transaction) => acc - transaction.amount, 0)).toLocaleString()}
            </p>
          </div>
          
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Monthly Spending</h2>
            <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              ${transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toLocaleString()}
            </p>
          </div>
          
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Savings Goal</h2>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">35%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
              Spending by Category
            </h2>
            <SpendingChart />
          </div>
          
          <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
              Recent Transactions
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 