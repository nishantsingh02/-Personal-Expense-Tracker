import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';

const Backend_url = import.meta.env.VITE_PRODUCTION_BACKEND_URL;
ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
}

const SpendingChart: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);

  const fetchTransactions = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }
      
      const response = await axios.get(`${Backend_url}/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Ensure we're setting an array
      const transactions = Array.isArray(response.data) ? response.data : [];
      setTransactions(transactions);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to fetch transactions: ${errorMessage}`);
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

    return () => {
      window.removeEventListener('transactionAdded', handleTransactionAdded as EventListener);
    };
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="h-96 flex items-center justify-center text-red-500">{error}</div>;
  if (!transactions.length) return (
    <div className="h-96 flex flex-col items-center justify-center text-center p-6">
      <div className="text-slate-400 dark:text-slate-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">No Transactions</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Add your first transaction to see spending by category</p>
    </div>
  );

  // Update categoryColors to be more dynamic
  const categoryColors: Record<string, string> = {
    Food: "#FF6384",
    Transport: "#36A2EB",
    Entertainment: "#FFCE56",
    Bills: "#4BC0C0",
    Other: "#9966FF",
    Shopping: "#FF9F40",
    Healthcare: "#4BC0C0",
    Education: "#FF6384",
    // Add more colors as needed
  };

  // Get a color for any category (including unexpected ones)
  const getCategoryColor = (category: string) => {
    if (categoryColors[category]) return categoryColors[category];
    // Generate a random color for unknown categories
    const colors = Object.values(categoryColors);
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // First calculate all categories for the legend
  const allCategories = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate grand total (including hidden categories)
  const grandTotal = Object.values(allCategories).reduce((a, b) => a + b, 0);

  // Filter out hidden categories for pie chart
  const visibleCategories = Object.entries(allCategories)
    .filter(([category]) => !hiddenCategories.includes(category))
    .reduce((acc, [category, amount]) => {
      acc[category] = amount;
      return acc;
    }, {} as Record<string, number>);

  // Calculate visible total for percentages
  const visibleTotal = Object.values(visibleCategories).reduce((a, b) => a + b, 0);

  // Update the chart data preparation
  const chartData = {
    labels: Object.keys(visibleCategories),
    datasets: [{
      data: Object.values(visibleCategories),
      backgroundColor: Object.keys(visibleCategories).map(category => getCategoryColor(category)),
    }],
  };

  const toggleCategory = (category: string) => {
    setHiddenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-col h-full min-h-[700px] p-6">
      {/* Chart Section */}
      <div className="relative h-[300px] w-full flex items-center justify-center mb-8">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 12,
                titleFont: {
                  size: 14,
                  weight: 'bold'
                },
                bodyFont: {
                  size: 13
                },
                callbacks: {
                  label: function(context: TooltipItem<'pie'>) {
                    const value = context.raw as number;
                    const percentage = ((value / visibleTotal) * 100).toFixed(1);
                    return ` $${value.toLocaleString()} (${percentage}%)`;
                  }
                }
              }
            },
          }}
        />
      </div>

      {/* Legend Section - Vertical layout */}
      <div className="space-y-2">
        {Object.entries(allCategories).map(([category, amount]) => {
          const isHidden = hiddenCategories.includes(category);
          const color = getCategoryColor(category);
          const percentage = ((amount / grandTotal) * 100).toFixed(1);

          return (
            <div 
              key={category}
              onClick={() => toggleCategory(category)}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200
                ${isHidden ? 'opacity-50 bg-gray-50/50' : 'hover:bg-gray-50/80'} 
                border border-gray-100 shadow-sm hover:shadow-md w-full`}
            >
              {/* Dot indicator */}
              <div 
                className={`w-4 h-4 rounded-full flex-shrink-0 transition-transform duration-200
                  ${isHidden ? 'scale-75' : 'scale-100'} mr-4`}
                style={{ backgroundColor: color }}
              />

              {/* Category info */}
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col">
                  <span className={`text-sm font-medium text-gray-700
                    ${isHidden ? 'line-through decoration-gray-400' : ''}`}>
                    {category}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    {percentage}%
                  </div>
                </div>
                <span className={`text-sm font-semibold text-gray-700 whitespace-nowrap ml-4
                  ${isHidden ? 'line-through decoration-gray-400' : ''}`}>
                  ${amount.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingChart;