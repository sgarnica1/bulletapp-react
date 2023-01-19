import { useState, useEffect } from "react";
import { utils } from "../../utils/utils";
import ErrorIcon from "../../assets/icon/error-alert.svg";

const Input = ({
  type,
  setValidData,
  disabled,
  placeholder,
  readOnly,
  readValue,
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
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
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

  // FUNCTION TO VALIDATE DATA BASED ON VALIDATION HANDLER
  function validateData(value, extraVal) {
    if (!value) return setErrorMessage(requiredFieldMessage);
    const res = validationHandler(value, extraVal);

    if (res) {
      setErrorMessage("");
      return setValidData(true);
    }

    setValidData(false);
    if (type === "date") return setErrorMessage(invalidDateMessage);

    return setErrorMessage(invalidFielMessage);
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

    if (value) {
      if (type === "time") {
        validateData(minutes, seconds);
      } else if (type === "score-record") {
        validateData({ sets, reps, score: value });
      } else {
        validateData(value);
      }
    }
  }, [submitError, resetError, value]);

  // READ ONLY INPUT
  if (readOnly)
    return (
      <div className="Input">
        <div className="Input__container">
          <input
            type={type}
            readOnly
            className="Input__input readonly"
            value={readValue ? readValue : ""}
          />
        </div>
      </div>
    );

  // TIME SCORE INPUT
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
            validateData(minutes, seconds);
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
            readOnly={readOnly}
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
            readOnly={readOnly}
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

  // SCORE RECORD INPUT
  if (type === "score-record")
    return (
      <div className="Input score-record">
        <div className={`Input__container ${errorMessage && "error"}`}>
          {/* SETS */}
          <div className="Input__container--label">
            <p className={`Input__label ${errorMessage && "error"}`}>Sets</p>
            <input
              type="number"
              className="Input__input"
              value={sets}
              name="sets"
              min={1}
              placeholder={0}
              readOnly={readOnly}
              disabled={disabled}
              onChange={(event) => {
                if (event.target.value < 0) return setSets(1);
                onChangeHandler(event, sets, setSets);
              }}
            />
          </div>

          {/* REPS */}
          <span className="Input__sign">X</span>
          <div className="Input__container--label">
            <p className={`Input__label ${errorMessage && "error"}`}>Reps</p>
            <input
              type="number"
              className="Input__input"
              value={reps}
              name="reps"
              min={1}
              placeholder={0}
              readOnly={readOnly}
              disabled={disabled}
              onChange={(event) => {
                if (event.target.value < 0) return setReps(1);
                onChangeHandler(event, reps, setReps);

                if (event.target.value == 0 || sets == 0) {
                  setValidData(false);
                  setErrorMessage(requiredFieldMessage);
                }
              }}
            />
          </div>

          {/*  WEIGHT */}
          <span className="Input__sign">@</span>
          <div className="Input__container--label">
            <p className={`Input__label ${errorMessage && "error"}`}>Peso</p>
            <input
              type="number"
              className="Input__input"
              value={value}
              name="weight"
              min={0}
              placeholder={0}
              readOnly={readOnly}
              disabled={disabled}
              onChange={(event) => {
                if (event.target.value < 0) return setValue(0);

                onChangeHandler(event, value, setValue);

                if (event.target.value == 0) {
                  setValidData(false);
                  setErrorMessage(requiredFieldMessage);
                }
              }}
            />
          </div>
          {/* UNITS */}
          <div className="Input__container--label">
            <select name="units" className="Input__input">
              <option className="Input__option" value="lbs">
                lb
              </option>
              <option className="Input__option" value="kg">
                kg
              </option>
            </select>
          </div>
        </div>

        <div className={`Input__error ${errorMessage && "show"}`}>
          <img className="Input__error-icon" src={ErrorIcon} alt="Error icon" />
          <p className="Input__error-message">{errorMessage}</p>
        </div>
      </div>
    );

  // OTHER INPUT TYPES (NUMBER, TEXT, DATE, EMAIL, PASSWORD)
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
          readOnly={readOnly}
          onChange={(event) => onChangeHandler(event, value, setValue)}
        />
        {type !== "date" && (
          <p className={`Input__units ${errorMessage && "error"}`}>{units}</p>
        )}
        {type === "date" && (
          <p
            className={`Input__units ${errorMessage && "error"}`}
            onClick={() => {
              console.log("Hoy");
              setValue(utils.formatISODate(new Date()));
              validateData(utils.formatISODate(new Date()));
            }}
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
