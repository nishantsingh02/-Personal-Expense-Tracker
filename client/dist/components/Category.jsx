"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AddCategory = ({ onChange }) => {
    // Categories list, can be modified dynamically
    const [categories] = (0, react_1.useState)(["Shopping", "Food", "Transport", "Bills", "Entertainment", "Others"]);
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)("");
    // Handle category selection
    const handleCategorySelect = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        onChange(category); // Notify parent component of category change
    };
    return (<div style={{ marginTop: "2px", marginBottom: "8px" }}>
      <h3>Types of Categories</h3>
      <br />
      <select value={selectedCategory} onChange={handleCategorySelect} style={{ padding: "10px", fontSize: "16px" }}>
        <option value="" disabled>Select Category</option>
        {categories.map((category) => (<option key={category} value={category}>
            {category}
          </option>))}
      </select>
    </div>);
};
exports.default = AddCategory;
