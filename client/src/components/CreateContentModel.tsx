import { useState, useRef } from "react";
import { CrossIcon } from "./Icons/CrossIcon";
import { Button } from "./Icons/Button";
import { Input } from "./Icons/Input";
import axios from "axios";
import Calender from "./Calender";
import AddCategory from "./Category";
const Backend_url = process.env.REACT_APP_BACKEND_URL;

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const addContent = async () => {
    const name = titleRef.current?.value;
    const amount = linkRef.current?.value;
    const date = selectedDate;
    const category = selectedCategory;

    if (!name || !amount || !category || !date) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${Backend_url}/api/content`, {
        name,
        amount: parseFloat(amount),
        date: selectedDate,
        category: selectedCategory,
      });

      if (response.status === 201) {
        setError(null);
        onClose();
        titleRef.current!.value = "";
        linkRef.current!.value = "";
        setSelectedDate(null);
        setSelectedCategory("");
      }
    } catch (error: any) {
      setError("Failed to create content. Please try again.");
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
            className="relative w-full max-w-md rounded-xl bg-white shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Add New Expense
              </h2>
              <button 
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <CrossIcon />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Expense Name
                </label>
                <Input 
                  reference={titleRef} 
                  placeholder="Enter expense name"
                  className="w-full" 
                />
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Amount ($)
                </label>
                <Input 
                  reference={linkRef} 
                  placeholder="0.00"
                  className="w-full" 
                />
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <Calender onChange={(date: Date) => setSelectedDate(date)} />
                </div>
              </div>

              {/* Category Selector */}
              <div className="bg-gray-50 rounded-lg p-4">
                <AddCategory onChange={(category: string) => setSelectedCategory(category)} />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-4 rounded-lg border border-red-100">
                  {error}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t p-4 bg-gray-50 rounded-b-xl">
              <Button
                onClick={onClose}
                variant="secondary"
                text="Cancel"
                className="px-4 py-2 hover:bg-gray-100"
              />
              <Button
                onClick={addContent}
                variant="primary"
                text="Add Expense"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

