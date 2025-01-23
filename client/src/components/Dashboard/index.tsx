import React, {useEffect,useState} from 'react';
import SpendingChart from '../Charts/SpendingChart';
import  { Button }  from '../Icons/Button';
import { Plusicon} from '../Icons/Plusicon';
import { CreateContentModel } from '../CreateContentModel';
import axios from "axios";

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
           const response = await axios.get("http://localhost:5000/api/transactions");
           setTransactions(response.data); // Set the transactions data from the backend
         } catch (err) {
           console.error("Error fetching transactions:", err);
           setError("Failed to fetch transactions.");
         }
       };
   
       fetchTransactions();
     }, []); // Empty dependency array 


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Personal Expense Tracker</h1>
 

      <div className="p-4">
        <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />
        <div className="fixed right-4 bottom-4 flex flex-col gap-4 md:flex-row md:top-4 md:bottom-auto md:left-auto md:left-4">
          <Button
        onClick={() => setModelOpen(true)}
        variant="primary"
        text="Add Expense"
        startIcon={<Plusicon />}
        className="w-full md:w-auto"
          />
        </div>
      </div>
  
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Summary Cards */}
        <div className="card">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Total Balance</h2>
          <p className="text-2xl font-bold text-primary-600">$ {24500 + transactions.reduce((acc, transaction) => acc - transaction.amount, 0)}</p>
        </div>
        
        <div className="card">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Monthly Spending</h2>
          <p className="text-2xl font-bold text-primary-600">$ {transactions.reduce((acc, transaction) => acc + transaction.amount, 0)}</p>
        </div>
        
        <div className="card">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Savings Goal</h2>
          <p className="text-2xl font-bold text-primary-600">35%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Spending by Category</h2>
          <SpendingChart />
        </div>
        
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Recent Transactions</h2>
          {/* Transaction list will go here */}
          <div>
      <h1>Transaction List</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Displays error message */}
      <ol>
        {transactions.length === 0 ? (
          <li>No transactions available</li>
        ) : (
          transactions.map((transaction) => (
            <li key={transaction.id}>
              <strong>{transaction.name}</strong> - {transaction.category} - ${transaction.amount} on {new Date(transaction.date).toLocaleDateString()}
            </li>
          ))
        )}
      </ol>
          </div>       
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 