"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
const SpendingChart = () => {
    const dummyData = [
        { category: "Food", amount: 300, transactionCount: 5 },
        { category: "Transport", amount: 200, transactionCount: 8 },
        { category: "Entertainment", amount: 150, transactionCount: 3 },
        { category: "Bills", amount: 400, transactionCount: 4 },
        { category: "Shopping", amount: 250, transactionCount: 6 },
    ];
    const chartData = {
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
    return (<div className="relative h-64">
      <react_chartjs_2_1.Pie data={chartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                },
            },
        }}/>
    </div>);
};
exports.default = SpendingChart;
