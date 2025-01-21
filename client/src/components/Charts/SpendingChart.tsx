import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { SpendingByCategory } from "../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

const SpendingChart: React.FC = () => {
  const dummyData: SpendingByCategory[] = [
    { category: "Food", amount: 300, transactionCount: 5 },
    { category: "Transport", amount: 200, transactionCount: 8 },
    { category: "Entertainment", amount: 150, transactionCount: 3 },
    { category: "Bills", amount: 400, transactionCount: 4 },
    { category: "Shopping", amount: 250, transactionCount: 6 },
  ];

  const chartData: ChartData = {
    labels: dummyData.map((item) => item.category),
    datasets: [
      {
        data: dummyData.map((item) => item.amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="relative h-64">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

export default SpendingChart;
