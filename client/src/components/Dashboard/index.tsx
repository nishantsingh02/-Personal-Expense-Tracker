import React from "react";
import { 
  /*ArrowUpRight,*/
  MoreHorizontal,  
  PieChart,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransactionList } from "@/components/TransactionList";
import SpendingOverview from "@/components/SpendingOverview";
import  SpendingChart  from "@/components/SpendingChart";
import { FinancialSummary } from "@/components/FinancialSummary";
import { MilestoneCards } from "@/components/MilestoneCards";
import  DashboardHeader  from "@/components/DashboardHeader";
import { BudgetGoals } from "@/components/BudgetGoals";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-8">
         <DashboardHeader />
        </div>
        
        {/* Financial Summary Cards */}
        <div className="mb-8">
          <FinancialSummary />
        </div>
        
        {/* Account Cards */}
        <div className="mb-8">
          <MilestoneCards />
        </div>
        
        {/* Main Dashboard Content */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 py-6">
  {/* Left Column - Spending Analytics */}
  <div className="md:col-span-2 space-y-6">
    <Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 gap-4">
        <div>
          <CardTitle className="text-lg md:text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Spending Overview
          </CardTitle>
          <CardDescription className="text-sm">
            Your monthly spending patterns
          </CardDescription>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" className="text-xs">
            Monthly
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="w-full h-full min-h-[300px]">
          <SpendingOverview />
        </div>
      </CardContent>
      <CardFooter className="text-xs sm:text-sm text-muted-foreground pt-0">
        <div className="flex items-center space-x-1">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
          <span>5% less than last month</span>
        </div>
      </CardFooter>
    </Card>
            
            {/*<Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
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
            </Card>*/}

            {/* Budget Goals */}
            <BudgetGoals />
            
            {/* Transaction List moved below Budget Goals */}
            <Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
  <CardHeader>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <CardTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Recent Transactions
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          View your latest financial activities
        </CardDescription>
      </div>
      <div className="transaction-count text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
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
                  <CardTitle className="text-md font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent sm:text-xl">
                    Spending by Category
                  </CardTitle>
                  <CardDescription className="text-sm mt-2">
                    How you're spending your money
                  </CardDescription>
                </div>
                <PieChart className="h-5 w-5 text-muted-foreground ml-4" />
              </CardHeader>
              <CardContent>
                <SpendingChart />
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg dark:shadow-slate-900/30 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">
                  Upcoming Features
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
                <a href="https://righteous-shape-20e.notion.site/Hi-User-1e34aff4282180b2ad58dd0d1bc6d63f">
                  <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50">
                    Click Here To Know More !
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;