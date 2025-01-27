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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!transactions.length) return <div>No Transaction Found !</div> 

  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = 
      (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: [
        "#FF6384", "#36A2EB", "#FFCE56", 
        "#4BC0C0", "#9966FF", "#FF9F40"
      ],
    }],
  };

  return (
    <div className="relative h-64">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
          },
        }}
      />
    </div>
  );
};

export default SpendingChart;