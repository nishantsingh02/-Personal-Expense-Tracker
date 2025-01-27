"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_chartjs_2_1 = require("react-chartjs-2");
const chart_js_1 = require("chart.js");
const Backend_url = process.env.REACT_APP_BACKEND_URL;
chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
const SpendingChart = () => {
    const [transactions, setTransactions] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${Backend_url}/api/transactions`);
                setTransactions(response.data);
                setLoading(false);
            }
            catch (err) {
                setError('Failed to fetch transactions');
                setLoading(false);
            }
        });
        fetchTransactions();
    }, []);
    if (loading)
        return <div>Loading...</div>;
    if (error)
        return <div>{error}</div>;
    if (!transactions.length)
        return <div>No Transaction Found !</div>;
    const categoryTotals = transactions.reduce((acc, transaction) => {
        acc[transaction.category] =
            (acc[transaction.category] || 0) + transaction.amount;
        return acc;
    }, {});
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
    return (<div className="relative h-64">
      <react_chartjs_2_1.Pie data={chartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "bottom" },
            },
        }}/>
    </div>);
};
exports.default = SpendingChart;
