import { useState, useEffect } from "react";
import ErrorIcon from "../../assets/icon/error-alert.svg";

const Select = ({ label, options, name, submitError }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (submitError && !value) setErrorMessage("Campo requerido");
  }, [submitError]);

  return (
    <div className="Select">
      <label htmlFor={name} className="Select__label">
        {label}
      </label>
      <div className={`Select__container ${errorMessage && "error"}`}>
        <select
          name={name}
          id={name}
          className="Select__select"
          onChange={(e) => {
            setErrorMessage(false);
            setValue(e.target.value);
          }}
        >
          <option value="" className="Select__option">
            {label}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="Select__option">
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={`Input__error ${errorMessage && "show"}`}>
        <img className="Input__error-icon" src={ErrorIcon} alt="Error icon" />
        <p className="Input__error-message">{errorMessage}</p>
      </div>
    </div>
  );
};

export { Select };
