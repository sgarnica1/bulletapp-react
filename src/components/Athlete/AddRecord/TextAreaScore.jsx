import React from "react";

const TextAreaScore = ({
  value,
  setValue,
  label,
  error,
  placeholder,
  readOnly = false,
}) => {
  return (
    <div
      className={`InputScore textarea ${error && "error"} ${
        readOnly && "readonly"
      }`}
    >
      <textarea
        className="Input__input"
        name="score"
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
};

export { TextAreaScore };
