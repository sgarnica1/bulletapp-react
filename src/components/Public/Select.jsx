import React from "react";

const Select = ({ label, options, name }) => {
  return (
    <div className="Select">
      <label htmlFor={name} className="Select__label">
        {label}
      </label>
      <div className="Select__container">
        <select name={name} id={name} className="Select__select">
          <option value="" className="Select__option">
            {label}
          </option>
          {options.map((option) => (
            <option
              key={option.id}
              value={option.name}
              className="Select__option"
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { Select };
