// AddCategory.tsx
import React from "react";

interface AddCategoryProps {
  onChange: (category: string) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onChange }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value); // Passes the selected category to the parent component
  };

  return (
    <div className="marginBottom: 8px">
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
    </div>
  );
};

export default AddCategory;




