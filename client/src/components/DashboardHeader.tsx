import React, { useState } from "react";
import {  Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateContentModel } from "./CreateContentModel";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export const DashboardHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-10">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          {isAuthenticated ? `${user?.name}'s Dashboard` : "Finance Dashboard"}
        </h1>
      </div>

      <div className="flex items-center w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <CreateContentModel open={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <Button variant="outline" onClick={() => setIsModalOpen(true)} className="hidden md:flex">
            Add Expense
          </Button>
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          <div className="flex items-center justify-center h-9 w-9">
            <ThemeToggle />
          </div>
          
         {/*} <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 flex items-center justify-center">
            <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </Button> */}
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 flex items-center justify-center sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            ) : (
              <Menu className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            )}
          </Button>
          
          <div className="hidden sm:block">
            <Button
              variant="outline"
              className="rounded-full flex items-center gap-2 border-slate-200 dark:border-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700"
              onClick={isAuthenticated ? logout : () => window.location.href = '/signin'}
            >
              <User className="h-4 w-4" />
              {isAuthenticated ? "Logout" : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="sm:hidden w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={isAuthenticated ? logout : () => window.location.href = '/signin'}
          >
            <User className="h-4 w-4 mr-2" />
            {isAuthenticated ? "Logout" : "Sign In"}
          </Button>
        </div>
      )}
    </header>
  );
};