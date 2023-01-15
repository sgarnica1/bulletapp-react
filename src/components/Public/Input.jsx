import { useState, useEffect } from "react";
import ErrorIcon from "../../assets/icon/error-alert.svg";

const Input = ({
  type,
  setValidData,
  disabled,
  placeholder,
  name,
  max,
  min,
  units,
  onChangeCallback,
  validationHandler,
  submitError,
  setSubmitError,
  resetError,
}) => {
  const [value, setValue] = useState("");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [errorMessage, setErrorMessage] = useState("");

  const invalidFielMessage = "Campo incorrecto";
  const requiredFieldMessage = "Campo requerido";
  const invalidDateMessage = "Fecha inválida";

  function onChangeHandler(event, value, setFunction) {
    setSubmitError(false);
    setErrorMessage(false);
    let newValue = event.target.value;
    if (type === "number" && event.target.value < 0) event.target.value = 0;

    if (onChangeCallback) newValue = onChangeCallback(newValue, value);

    setFunction(newValue);
  }

  function validateData(value, extraVal) {
    if (!value) return setErrorMessage(requiredFieldMessage);
    const res = validationHandler(value, extraVal);
    if (res) return setValidData(true);
    if (!res) {
      setValidData(false);
      if (type === "date") return setErrorMessage(invalidDateMessage);
      setErrorMessage(invalidFielMessage);
    }
  }

  useEffect(() => {
    if (submitError) {
      if (type === "time") {
        validateData(minutes, seconds);
      } else {
        validateData(value);
      }
    }
    if (resetError) setErrorMessage("");
    if (value) validateData(value);
  }, [submitError, resetError, value]);

  if (type === "time")
    return (
      <div className="Input time">
        <div
          className={`Input__container ${errorMessage && "error"}`}
          onBlur={() => {
            if (minutes == 0 && seconds == 0) {
              setValidData(false);
              return setErrorMessage(requiredFieldMessage);
            }
            setErrorMessage("");
          }}
        >
          <input
            type="number"
            className="Input__input"
            placeholder={placeholder}
            value={minutes}
            name="minutes"
            max={59}
            min={0}
            disabled={disabled}
            onChange={(event) => onChangeHandler(event, minutes, setMinutes)}
          />
          <p className={`Input__units ${errorMessage && "error"}`}>Min</p>
          <input
            type="number"
            className="Input__input"
            placeholder={placeholder}
            value={seconds}
            name="seconds"
            max={59}
            min={0}
            disabled={disabled}
            onChange={(event) => onChangeHandler(event, seconds, setSeconds)}
          />
          <p className={`Input__units ${errorMessage && "error"}`}>Seg</p>
        </div>

        <div className={`Input__error ${errorMessage && "show"}`}>
          <img className="Input__error-icon" src={ErrorIcon} alt="Error icon" />
          <p className="Input__error-message">{errorMessage}</p>
        </div>
      </div>
    );

  return (
    <div className="Input">
      <div
        className={`Input__container ${errorMessage && "error"}`}
        onBlur={(event) =>
          event.target.value == ""
            ? setErrorMessage(requiredFieldMessage)
            : validateData(event.target.value)
        }
      >
        <input
          type={type}
          className="Input__input"
          placeholder={placeholder}
          value={value}
          name={name}
          max={max}
          min={min}
          disabled={disabled}
          onChange={(event) => onChangeHandler(event, value, setValue)}
        />
        {type !== "date" && (
          <p className={`Input__units ${errorMessage && "error"}`}>{units}</p>
        )}
        {type === "date" && (
          <p
            className={`Input__units ${errorMessage && "error"}`}
            onClick={() => setValue(new Date().toISOString().slice(0, 10))}
          >
            HOY
          </p>
        )}
      </div>
      <div className={`Input__error ${errorMessage && "show"}`}>
        <img className="Input__error-icon" src={ErrorIcon} alt="Error icon" />
        <p className="Input__error-message">{errorMessage}</p>
      </div>
    </div>
  );
};

export { Input };
