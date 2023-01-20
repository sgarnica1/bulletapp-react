import { useState, useEffect } from "react";
import { info } from "../../utils/info";
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
  ...props
}) => {
  const [value, setValue] = useState("");
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [errorMessage, setErrorMessage] = useState("");

  // CONSTANTS
  const typeDate = info.components.input.type.date;
  const typeWeight = info.components.input.type.weight;
  const typeSets = info.components.input.type.sets;
  const typeNumber = info.components.input.type.number;
  const typeTime = info.components.input.type.time;
  const typeCheckbox = info.components.input.type.checkbox;

  // ERROR MESSAGES
  const invalidFielMessage = "Campo incorrecto";
  const requiredFieldMessage = "Campo requerido";
  const invalidDateMessage = "Fecha inválida";

  useEffect(() => {
    if (submitError) {
      if (type === typeTime) {
        validateData(minutes, seconds);
      } else {
        validateData(value);
      }
    }

    if (resetError) setErrorMessage("");

    if (value) {
      if (type === typeTime) {
        validateData(minutes, seconds);
      } else if (type === typeWeight) {
        validateData({ sets, reps, score: value });
      } else {
        validateData(value);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (type === typeCheckbox)
    return (
      <div className="Input">
        <div className="Input__checkbox">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            className="Input__input--checkbox"
            onClick={(event) => props.setChecked(event.target.checked)}
          />
          <label htmlFor="checkbox" className="Input__label">
            {props.checkboxLabel}
          </label>
        </div>
      </div>
    );

  // TIME SCORE INPUT
  if (type === typeTime)
    return (
      <div className="Input time">
        <div
          className={`Input__container ${errorMessage && "error"}`}
          onBlur={() => {
            if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
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
  if (type === typeWeight)
    return (
      <div className="Input weight">
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

                if (
                  parseInt(event.target.value) === 0 ||
                  parseInt(sets) === 0
                ) {
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

                if (parseInt(event.target.value) === 0) {
                  setValidData(false);
                  setErrorMessage(requiredFieldMessage);
                }
              }}
            />
          </div>
          {/* UNITS */}
          <div className="Input__container--label">
            <select name="units" className="Input__input">
              {Object.values(info.firebase.values.scoreTypes.weight.units).map(
                (unit, index) => (
                  <option className="Input__option" value={unit} key={index}>
                    {unit}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className={`Input__error ${errorMessage && "show"}`}>
          <img className="Input__error-icon" src={ErrorIcon} alt="Error icon" />
          <p className="Input__error-message">{errorMessage}</p>
        </div>
      </div>
    );

  // SCORE RECORD INPUT
  if (type === typeSets)
    return (
      <div className="Input sets">
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

                if (
                  parseInt(event.target.value) === 0 ||
                  parseInt(sets) === 0
                ) {
                  setValidData(false);
                  setErrorMessage(requiredFieldMessage);
                }
              }}
            />
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
          event.target.value === ""
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
        {type !== typeDate && (
          <p className={`Input__units ${errorMessage && "error"}`}>{units}</p>
        )}
        {type === typeDate && (
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

  // FUNCTION TO HANDLE INPUT CHANGE
  function onChangeHandler(event, value, setFunction) {
    setSubmitError(false);
    setErrorMessage(false);
    let newValue = event.target.value;

    if (type === typeNumber && event.target.value < 0) event.target.value = 0;

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
    if (type === typeDate) return setErrorMessage(invalidDateMessage);

    return setErrorMessage(invalidFielMessage);
  }
};

export { Input };
