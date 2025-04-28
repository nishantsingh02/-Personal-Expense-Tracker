import { useState } from "react";
import { Menu, X, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateContentModel } from "./CreateContentModel";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "../assets/logo.svg";

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 backdrop-blur-md">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="relative">
                <img src={logo} className="w-40 h-20 object-contain" alt="100xPayments" />
              </div>
              <div className="ml-1">
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  100xPayments
                </span>
              </div>
            </div>

            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
              {isAuthenticated && (
                <div className="text-center">
                  <h1 className="text-xl font-semibold text-slate-700 dark:text-slate-300 m-4">
                    Welcome, <span className="text-indigo-600 dark:text-indigo-400">{user?.name}</span>
                  </h1>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                size="sm"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                onClick={isAuthenticated ? logout : () => window.location.href = '/signin'}
              >
                <User className="mr-2 h-4 w-4" />
                {isAuthenticated ? "Logout" : "Sign In"}
              </Button>
            </div>

            {/* Mobile Navigation Button */}
            <div className="flex md:hidden items-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Separator Line */}
        <div className="h-0.5 bg-gradient-to-r from-indigo-300 via-purple-500 to-indigo-300 dark:from-indigo-600 dark:via-purple-700 dark:to-indigo-600"></div>
      </header>

      {/* Mobile Welcome Message - when menu is closed */}
      <div className="md:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-2 px-6 text-center">
        {isAuthenticated && !isMenuOpen && (
          <h2 className="text-base font-medium text-slate-700 dark:text-slate-300">
            Welcome, <span className="text-indigo-600 dark:text-indigo-400">{user?.name}</span>
          </h2>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed z-40 inset-x-0 top-20">
          <div className="mx-4 rounded-b-lg bg-white dark:bg-slate-800 shadow-lg py-3 px-2 m-4">

            {isAuthenticated && (
              <div className="px-4 py-2 mb-2 text-center">
                <h2 className="text-base font-medium text-slate-700 dark:text-slate-300">
                  Welcome, <span className="text-indigo-600 dark:text-indigo-400">{user?.name}</span>
                </h2>
              </div>
            )}
            
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-left font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 rounded-md py-3"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
              <div className="px-4 py-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-700">
                <span className="text-sm text-slate-500 dark:text-slate-400">Toggle Theme</span>
                <ThemeToggle />
              </div>
              <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  onClick={isAuthenticated ? logout : () => window.location.href = '/signin'}
                >
                  <User className="mr-2 h-4 w-4" />
                  {isAuthenticated ? "Logout" : "Sign In"}
                </Button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <CreateContentModel
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}