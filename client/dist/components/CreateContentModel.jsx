"use strict";
//import { useState } from "react";
/*import { CrossIcon } from "./Icons/CrossIcon";
import { Button } from "./Icons/Button";
import { Input } from "./Icons/Input";
import { useRef } from "react";
import Calender from "./Calender";
import AddCategory from "./Category";

//import { BACKEND_URL } from "../config";
/*
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}*/ /*

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  //const [type, setType] = useState("youtube");
  //const [error, setError] = useState<string | null>(null); // Added error state
/*
  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      setError("Title and Link are required."); // Error for missing fields
      return;
    }
  

    try {
      // Send POST request to create content
      await axios.post(
        `${BACKEND_URL}/content`,
        {
          link,
          title,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Updated to include Bearer prefix
          },
        }
      );

      setError(null); // Clear any previous errors
      onClose(); // Close the model after successful submission
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating content:", error.message);
      } else {
        console.error("Error creating content:", error);
      }
      setError("Failed to create content. Please check your inputs or token.");
    }
  }
*/ /*
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
                <Input reference={titleRef} placeholder={"Title"} />
                <Input reference={linkRef} placeholder={"Amount"} />
                {/*{error && <p className="text-red-500">{error}</p>} {/* Display error message */ /*}
<div>
  <h1>Date</h1>
 {/* <div className="flex p-4 gap-2 justify-center">
    <Button
      text="Yesterday"
      variant={type === ContentType.Youtube ? "primary" : "secondary"}
      onClick={() => {
        setType(ContentType.Youtube);
      }}
    ></Button>
    <Button
      text="Tomorrow"
      variant={type === ContentType.Twitter ? "primary" : "secondary"}
      onClick={() => {
        setType(ContentType.Twitter);
      }}
    ></Button>
  </div> */ /*}
<Calender />
<AddCategory />
  <br />
</div>
</div>
<div className="flex justify-center">
<Button /*onClick={}*/ /* variant="primary" text="Submit" />
</div>
</span>
</div>
<div className="flex flex-col justify-center md:flex flex-row justify-center"></div>
</div>
)}
</div>
);
}
*/
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
exports.CreateContentModel = void 0;
const react_1 = require("react");
const CrossIcon_1 = require("./Icons/CrossIcon");
const Button_1 = require("./Icons/Button");
const Input_1 = require("./Icons/Input");
const react_2 = require("react");
const axios_1 = __importDefault(require("axios"));
const Calender_1 = __importDefault(require("./Calender"));
const Category_1 = __importDefault(require("./Category"));
function CreateContentModel({ open, onClose }) {
    const titleRef = (0, react_2.useRef)(null);
    const linkRef = (0, react_2.useRef)(null);
    const [error, setError] = (0, react_1.useState)(null);
    // State to manage selected date and category
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(null);
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)("");
    const addContent = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const title = (_a = titleRef.current) === null || _a === void 0 ? void 0 : _a.value;
        const amount = (_b = linkRef.current) === null || _b === void 0 ? void 0 : _b.value;
        const date = new Date(); // Use selected date from Calender
        const category = "some-category"; // Get the selected category (from AddCategory)
        if (!title || !amount || !category || !date) {
            setError("Title, Amount, and Category are required.");
            return;
        }
        try {
            // Send POST request using axios
            const response = yield axios_1.default.post("/content", {
                title,
                amount: parseFloat(amount),
                date: selectedDate,
                category: selectedCategory,
            });
            // Check if the response is successful
            if (response.status === 201) {
                console.log("Content created successfully:", response.data);
                setError(null); // Clear any previous errors
                onClose(); // Close the modal on success
            }
        }
        catch (error) {
            // Handle error response
            if (error.response) {
                console.error("Error creating content:", error.response.data);
                setError(error.response.data.error || "Failed to create content.");
            }
            else {
                console.error("Error creating content:", error.message);
                setError("Failed to create content. Please try again.");
            }
        }
    });
    return (<div>
      {open && (<div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen fixed left-0 flex justify-center">
            <span className="bg-white opacity-100 p-4 rounded fixed">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon_1.CrossIcon />
                </div>
              </div>
              <div>
                <Input_1.Input reference={titleRef} placeholder={"Title"}/>
                <Input_1.Input reference={linkRef} placeholder={"Amount"}/>
                {error && <p className="text-red-500">{error}</p>}
                <div>
                  <h1>Date</h1>
                  <Calender_1.default onChange={(date) => setSelectedDate(date)}/>
                  <Category_1.default onChange={(category) => setSelectedCategory(category)}/>
                  <br />
                </div>
              </div>
              <div className="flex justify-center">
                <Button_1.Button onClick={addContent} variant="primary" text="Submit"/>
              </div>
            </span>
          </div>
        </div>)}
    </div>);
}
exports.CreateContentModel = CreateContentModel;
