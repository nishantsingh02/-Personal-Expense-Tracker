import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";

export const AccountCards: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Your Accounts
        </h2>
        <Button variant="outline" size="sm" className="text-xs rounded-lg">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Account
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl h-48 p-5 flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg transform hover:scale-[1.02] transition-all duration-200 cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
          <div className="relative">
            <p className="text-indigo-200 text-sm">Main Account</p>
            <p className="text-xl font-semibold mt-1">$ 0.00</p>
          </div>
          
          <div className="relative">
            <div className="flex justify-between text-sm">
              <p className="text-indigo-200">**** 4832</p>
              <p className="text-indigo-200">09/27</p>
            </div>
            <p className="mt-2 font-medium">{isAuthenticated ? `${user?.name}'s Card` : "User's Card"}</p>
            <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full border-4 border-indigo-400/30"></div>
            <div className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full border-4 border-indigo-400/40"></div>
          </div>
        </div>
        
        <div className="rounded-xl h-48 p-5 flex flex-col justify-between bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg transform hover:scale-[1.02] transition-all duration-200 cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
          <div className="relative">
            <p className="text-slate-300 text-sm">Savings Account</p>
            <p className="text-xl font-semibold mt-1">$ 0.00</p>
          </div>
          
          <div className="relative">
            <div className="flex justify-between text-sm">
              <p className="text-slate-300">**** 7659</p>
              <p className="text-slate-300">11/26</p>
            </div>
            <p className="mt-2 font-medium">{isAuthenticated ? `${user?.name}'s Card` : "User's Card"}</p>
            <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full border-4 border-slate-600/30"></div>
            <div className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full border-4 border-slate-600/40"></div>
          </div>
        </div>
        
        <div className="rounded-xl h-48 p-5 flex flex-col justify-between bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg transform hover:scale-[1.02] transition-all duration-200 cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
          <div className="relative">
            <p className="text-amber-100 text-sm">Investment Account</p>
            <p className="text-xl font-semibold mt-1">$ 0.00</p>
          </div>
          
          <div className="relative">
            <div className="flex justify-between text-sm">
              <p className="text-amber-100">**** 9217</p>
              <p className="text-amber-100">03/25</p>
            </div>
            <p className="mt-2 font-medium">{isAuthenticated ? `${user?.name}'s Card` : "User's Card"}</p>
            <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full border-4 border-amber-500/30"></div>
            <div className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full border-4 border-amber-500/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};