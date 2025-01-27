"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// AddCategory.tsx
const react_1 = __importDefault(require("react"));
const AddCategory = ({ onChange }) => {
    const handleCategoryChange = (e) => {
        onChange(e.target.value); // Passes the selected category to the parent component
    };
    return (<div className="marginBottom: 8px">
      <h3>Category</h3>
      <br />
      <select onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>
    </div>);
};
exports.default = AddCategory;
