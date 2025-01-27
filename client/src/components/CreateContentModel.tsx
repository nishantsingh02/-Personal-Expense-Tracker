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

  // State to manage selected date and category
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const addContent = async () => {
    const name = titleRef.current?.value; // Name field (formerly 'title')
    const amount = linkRef.current?.value; // Amount field
    const date = selectedDate; // Use selected date from Calender
    const category = selectedCategory; // Get the selected category

    // Log the payload for debugging purposes
    console.log("Request Payload:", { name, amount, date, category });

    if (!name || !amount || !category || !date) {
      setError("All fields are required");
      return;
    }

    try {
      // Sends POST request using Axios to the backend
      const response = await axios.post(`${Backend_url}/api/content`, {
        name, // description of the expense
        amount: parseFloat(amount), // Sends the amount as a number
        date: selectedDate, // Send selected date
        category: selectedCategory, // Send selected category
      });

      
      if (response.status === 201) {
        console.log("Content created successfully:", response.data);
        setError(null); 
        onClose(); // Close the form on success

        // Reset form fields after successful submission
        titleRef.current!.value = "";
        linkRef.current!.value = "";
        setSelectedDate(null);
        setSelectedCategory("");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error creating content:", error.response.data);
        setError(error.response.data.error || "Failed to create content.");
      } else {
        console.error("Error creating content:", error.message);
        setError("Failed to create content. Please try again.");
      }
    }
  };

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen fixed left-0 flex justify-center">
            <span className="bg-white opacity-100 p-4 rounded fixed">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input reference={titleRef} placeholder={"Name"} /> 
                <Input reference={linkRef} placeholder={"Amount"} />
                {error && <p className="text-red-500">{error}</p>}
                <div>
                  <h1>Date</h1>
                  <Calender onChange={(date: Date) => setSelectedDate(date)} />
                    <br />
                  <AddCategory onChange={(category: string) => setSelectedCategory(category)} />
                  <br />
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={addContent} variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

