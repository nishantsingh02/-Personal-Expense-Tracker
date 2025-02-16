import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const Backend_url = process.env.REACT_APP_BACKEND_URL;
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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${Backend_url}/api/transactions`);
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); 

  if (loading) return <div className="h-96 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="h-96 flex items-center justify-center">{error}</div>;
  if (!transactions.length) return <div className="h-96 flex items-center justify-center">No Transaction Found !</div> 

  // Define colors for each category
  const categoryColors = {
    Food: "#FF6384",
    Transport: "#36A2EB",
    Entertainment: "#FFCE56",
    Bills: "#4BC0C0",
    Other: "#9966FF",
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

  // Prepare chart data with consistent colors
  const chartData = {
    labels: Object.keys(visibleCategories),
    datasets: [{
      data: Object.values(visibleCategories),
      backgroundColor: Object.keys(visibleCategories).map(
        category => categoryColors[category as keyof typeof categoryColors] || "#FF9F40"
      ),
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
    <div className="flex flex-col h-[400px] sm:h-[450px] lg:h-[500px]">
      {/* Chart Title and Total */}
      {/*<div className="flex justify-between items-center mb-4 sm:mb-6 px-2 sm:px-4">
        <div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300">
            Total Spending: ${grandTotal.toLocaleString()}
          </p>
        </div>
      </div> */}

      {/* Chart Section */}
      <div className="relative flex-1 min-h-0 mb-4 sm:mb-6">
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
                  label: function(context: any) {
                    const value = context.raw;
                    const percentage = ((value / visibleTotal) * 100).toFixed(1);
                    return ` $${value.toLocaleString()} (${percentage}%)`;
                  }
                }
              }
            },
          }}
        />
      </div>

      {/* Custom Legend */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 px-2 sm:px-4 overflow-y-auto">
        {Object.entries(allCategories).map(([category, amount]) => (
          <div 
            key={category} 
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200
              ${hiddenCategories.includes(category) 
                ? 'opacity-50 bg-gray-50' 
                : 'hover:bg-gray-50'
              }`}
            onClick={() => toggleCategory(category)}
          >
            <div 
              className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full flex-shrink-0 transition-transform duration-200 ${
                hiddenCategories.includes(category) ? 'scale-75' : ''
              }`}
              style={{ 
                backgroundColor: categoryColors[category as keyof typeof categoryColors] || "#FF9F40" 
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center gap-2">
                <span className={`text-sm font-medium text-gray-700 truncate ${
                  hiddenCategories.includes(category) 
                    ? 'line-through decoration-gray-400'
                    : ''
                }`}>
                  {category}
                </span>
                <span className={`text-sm text-gray-600 ${
                  hiddenCategories.includes(category) 
                    ? 'line-through decoration-gray-400'
                    : ''
                }`}>
                  ${amount.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {((amount / grandTotal) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;