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
const SpendingChart_1 = __importDefault(require("../Charts/SpendingChart"));
const Button_1 = require("../Icons/Button");
const Plusicon_1 = require("../Icons/Plusicon");
const CreateContentModel_1 = require("../CreateContentModel");
const axios_1 = __importDefault(require("axios"));
const Dashboard = () => {
    const [modelOpen, setModelOpen] = react_1.default.useState(false);
    const [transactions, setTransactions] = (0, react_1.useState)([]);
    const [error, setError] = (0, react_1.useState)(null);
    // Fetch transactions from the backend
    (0, react_1.useEffect)(() => {
        const fetchTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get("https://personal-expense-tracker-1wzx.onrender.com/api/transactions");
                setTransactions(response.data); // Set the transactions data from the backend
            }
            catch (err) {
                console.error("Error fetching transactions:", err);
                setError("Failed to fetch transactions.");
            }
        });
        fetchTransactions();
    }, []); // Empty dependency array 
    return (<div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Personal Expense Tracker</h1>
 

      <div className="p-4">
        <CreateContentModel_1.CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)}/>
        <div className="fixed right-4 bottom-4 flex flex-col gap-4 md:flex-row md:top-4 md:bottom-auto md:left-auto md:left-4">
          <Button_1.Button onClick={() => setModelOpen(true)} variant="primary" text="Add Expense" startIcon={<Plusicon_1.Plusicon />} className="w-full md:w-auto"/>
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
          <SpendingChart_1.default />
        </div>
        
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Recent Transactions</h2>
          {/* Transaction list will go here */}
          <div>
      <h1>Transaction List</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Displays error message */}
      <ol>
        {transactions.length === 0 ? (<li>No transactions available</li>) : (transactions.map((transaction) => (<li key={transaction.id}>
              <strong>{transaction.name}</strong> - {transaction.category} - ${transaction.amount} on {new Date(transaction.date).toLocaleDateString()}
            </li>)))}
      </ol>
          </div>       
        </div>
      </div>
    </div>);
};
exports.default = Dashboard;
