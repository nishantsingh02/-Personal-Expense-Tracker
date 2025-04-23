import React from "react";
import { 
  /*ArrowUpRight,*/
  MoreHorizontal,  
  PieChart,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransactionList } from "@/components/TransactionList";
import SpendingOverview from "@/components/SpendingOverview";
import  SpendingChart  from "@/components/SpendingChart";
import { FinancialSummary } from "@/components/FinancialSummary";
import { AccountCards } from "@/components/AccountCards";
import { DashboardHeader } from "@/components/DashboardHeader";
import { BudgetGoals } from "@/components/BudgetGoals";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <DashboardHeader />
        
        {/* Financial Summary Cards */}
        <div className="mb-8">
          <FinancialSummary />
        </div>
        
        {/* Account Cards */}
        <div className="mb-8">
          <AccountCards />
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Spending Analytics */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Spending Overview
                  </CardTitle>
                  <CardDescription>
                    Your monthly spending patterns
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Monthly
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <SpendingOverview />
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground pt-0">
                <div className="flex items-center space-x-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                  <span>5% less than last month</span>
                </div>
              </CardFooter>
            </Card>
            
            <Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Budget Goals
                  </CardTitle>
                  <CardDescription>
                    Track your monthly budget goals
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <BudgetGoals />
              </CardContent>
            </Card>
            
            {/* Transaction List moved below Budget Goals */}
            <Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Recent Transactions</CardTitle>
                    <CardDescription>View your latest financial activities</CardDescription>
                  </div>
                  <div className="transaction-count text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    Loading transactions...
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-0">
                  <TransactionList />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Pie Chart */}
          <div className="space-y-8">
            {/* New Spending by Category Pie Chart */}
            <Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Spending by Category
                  </CardTitle>
                  <CardDescription>
                    How you're spending your money
                  </CardDescription>
                </div>
                <PieChart className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SpendingChart />
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">
                  Premium Features
                </CardTitle>
               {/* <CardDescription className="text-indigo-100">
                  Unlock advanced insights
                </CardDescription>*/}
                <CardDescription className="text-indigo-100">
                  Coming Soon !
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    <span>Personalized financial advice</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    <span>Advanced budget planning</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    <span>Investment insights</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50">
                  Click Here To Know More !
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;