import React from 'react';

const Dropdown = ({ label, onChange, options }) => {
  return (
    <div className="dropdown">
      <label>{label}</label>
      <select onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  ); 
};

export default Dropdown;
