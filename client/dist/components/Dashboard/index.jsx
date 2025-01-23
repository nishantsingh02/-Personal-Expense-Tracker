"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SpendingChart_1 = __importDefault(require("../Charts/SpendingChart"));
const Button_1 = require("../Icons/Button");
const Plusicon_1 = require("../Icons/Plusicon");
const CreateContentModel_1 = require("../CreateContentModel");
const Dashboard = () => {
    const [modelOpen, setModelOpen] = react_1.default.useState(false);
    return (<div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Personal Expense Tracker</h1>
 
     {/*<div className="flex justify-end mb-6 right-4 bottom-4">
           <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4'>Add Expense</button>
         </div>*/}

      <div className="p-4">
        <CreateContentModel_1.CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)}/>
        <div className="fixed mb-20 right-4 bottom-4 md:top-4 md:bottom-auto flex flex-col md:flex-row gap-4">
          <Button_1.Button onClick={() => setModelOpen(true)} variant="primary" text="Add Expense" startIcon={<Plusicon_1.Plusicon />}/>
       </div>
       </div>
  
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Summary Cards */}
        <div className="card">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Total Balance</h2>
          <p className="text-2xl font-bold text-primary-600">$24,500.00</p>
        </div>
        
        <div className="card">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Monthly Spending</h2>
          <p className="text-2xl font-bold text-primary-600">$3,250.00</p>
        </div>
        
        <div className="card">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Savings Goal</h2>
          <p className="text-2xl font-bold text-primary-600">75%</p>
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
        </div>
      </div>
    </div>);
};
exports.default = Dashboard;
