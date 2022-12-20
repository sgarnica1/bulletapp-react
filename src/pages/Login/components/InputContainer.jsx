import { useState } from "react";
import "./input-container.scss";

const InputContainer = ({
  children,
  type,
  name,
  placeholder,
  errorMessage,
}) => {
  const [focusInput, setFocusInput] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="InputContainer">
      <div className={`InputContainer__field ${errorMessage && "error"}`}>
        <div
          htmlFor={name}
          className={`InputContainer__label ${focusInput && "focus"}`}
        >
          {placeholder}
        </div>
        <input
          className="InputContainer__input"
          type={type}
          name={name}
          value={value}
          required
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocusInput(true)}
          onBlur={() => (value === "" ? setFocusInput(false) : null)}
        />
        {children}
      </div>
    </div>
  );
};

export { InputContainer };
