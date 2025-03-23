import React, { useState } from "react";

type CheckBoxProps = {
  label: string;
  handleClick: (label: string) => void;
};

const CheckboxComponent: React.FC<CheckBoxProps> = ({ label, handleClick }) => {
  const [isChecked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => {
      const newCheckedState = !prev;
      return newCheckedState;
    });
    
    handleClick(label); 
  };

  return (
    <div className="flex items-center space-x-2 p-1">
      <input
        type="checkbox"
        id={label}
        checked={isChecked}
        onChange={handleChange}
        className=""
      />
      <label htmlFor={label} className="w-full text-gray-700 cursor-pointer hover:bg-gray-100 rounded p-2">
        {label}
      </label>
    </div>
  );
};

export default React.memo(CheckboxComponent);
