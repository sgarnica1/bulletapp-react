import React from "react";

const InputScore = ({
  value,
  setValue,
  label,
  error,
  options,
  option,
  setOption,
  max,
  readOnly = false,
}) => {
  return (
    <div className={`InputScore ${error && "error"} ${readOnly && "readonly"}`}>
      <input
        type="number"
        placeholder="0"
        className="InputScore__input"
        name="score"
        value={value}
        max={max}
        min={0}
        onChange={(event) => {
          if (event.target.value < 0) event.target.value = 0;
          if (event.target.value > max) event.target.value = max;
          setValue(event.target.value);
        }}
        readOnly={readOnly}
      />
      {label && (
        <label htmlFor="score" className="InputScore__label">
          {label}
        </label>
      )}
      {options && (
        <select
          className="InputScore__units"
          name="score"
          value={option}
          onChange={(event) => setOption(event.target.value)}
          disabled={readOnly}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export { InputScore };
