import { useRef, useState } from 'react';
import { CrossIcon } from "./Icons/CrossIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import Calender from "./Calender";
import { useAuth } from "../contexts/AuthContext";
import { Transaction } from '../types';

const Backend_url = import.meta.env.VITE_PRODUCTION_BACKEND_URL;

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
  const { token } = useAuth();
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // To prevent double submission


  const addContent = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions
    const name = titleRef.current?.value;
    const amount = linkRef.current?.value;
    const date = selectedDate;
    const category = selectedCategory;

    if (!name || !amount || !category || !date) {
      setError("All fields are required");
      return;
    }

     // Prevent future dates
     const today = new Date();
     today.setHours(0, 0, 0, 0);
     const selected = new Date(date);
     selected.setHours(0, 0, 0, 0);
 
     if (selected > today) {
       setError("Date cannot be in the future");
       return;
     }

    try {
      setIsSubmitting(true); // Set submitting state to true
      const formattedDate = date.toISOString().split('T')[0];
      
      const response = await axios.post<Transaction>(`${Backend_url}/transactions`, {
        name,
        amount: parseFloat(amount),
        date: formattedDate,
        category: selectedCategory,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        // Dispatch custom event with the new transaction data
        const newTransaction = {
          id: response.data.id,
          description: name,
          category: selectedCategory,
          date: formattedDate,
          amount: parseFloat(amount)
        };
        
        const event = new CustomEvent('transactionAdded', {
          detail: newTransaction
        });
        window.dispatchEvent(event);

        setError(null);
        onClose();
        titleRef.current!.value = "";
        linkRef.current!.value = "";
        setSelectedDate(null);
        setSelectedCategory("");
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : "Failed to create expense. Please try again.";
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative w-full max-w-md rounded-xl bg-white shadow-lg dark:bg-gray-800"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Expense
              </h2>
              <button 
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <CrossIcon />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expense Name
                </label>
                <Input
                  ref={titleRef}
                  placeholder="Enter expense name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                />
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount ($)
                </label>
                <Input 
                  ref={linkRef}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                /> 
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <Calender onChange={(date: Date) => setSelectedDate(date)} />
                </div>
              </div>

              {/* Category Selector */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                    className="w-full px-4 py-2.5 text-base bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer appearance-none"
                  >
                    <option value="">Select a category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
                  {error}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t dark:border-gray-700">
              <Button
                onClick={onClose}
                variant="outline"
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={addContent}
                variant="default"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
              >
                Add Expense
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

