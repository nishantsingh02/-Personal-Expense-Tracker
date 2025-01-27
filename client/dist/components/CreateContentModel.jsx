"use strict";
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
const axios_1 = __importDefault(require("axios"));
const Calender_1 = __importDefault(require("./Calender"));
const Category_1 = __importDefault(require("./Category"));
const Backend_url = process.env.REACT_APP_BACKEND_URL;
function CreateContentModel({ open, onClose }) {
    const titleRef = (0, react_1.useRef)(null);
    const linkRef = (0, react_1.useRef)(null);
    const [error, setError] = (0, react_1.useState)(null);
    // State to manage selected date and category
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(null);
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)("");
    const addContent = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const name = (_a = titleRef.current) === null || _a === void 0 ? void 0 : _a.value; // Name field (formerly 'title')
        const amount = (_b = linkRef.current) === null || _b === void 0 ? void 0 : _b.value; // Amount field
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
            const response = yield axios_1.default.post(`${Backend_url}/api/content`, {
                name,
                amount: parseFloat(amount),
                date: selectedDate,
                category: selectedCategory, // Send selected category
            });
            if (response.status === 201) {
                console.log("Content created successfully:", response.data);
                setError(null);
                onClose(); // Close the form on success
                // Reset form fields after successful submission
                titleRef.current.value = "";
                linkRef.current.value = "";
                setSelectedDate(null);
                setSelectedCategory("");
            }
        }
        catch (error) {
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
                <Input_1.Input reference={titleRef} placeholder={"Name"}/> 
                <Input_1.Input reference={linkRef} placeholder={"Amount"}/>
                {error && <p className="text-red-500">{error}</p>}
                <div>
                  <h1>Date</h1>
                  <Calender_1.default onChange={(date) => setSelectedDate(date)}/>
                    <br />
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
