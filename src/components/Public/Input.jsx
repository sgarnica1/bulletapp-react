import { useState, useEffect } from "react";
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";
import ErrorIcon from "../../assets/icon/error-alert.svg";
import InvisibleIcon from "../../assets/icon/invisible.svg";
import VisibleIcon from "../../assets/icon/visible.svg";

const Input = ({
  type,
  name,
  label,
  setValidData,
  disabled,
  placeholder,
  readOnly,
  readValue,
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
  const [showPassword, setShowPassword] = useState(false);

  // CONSTANTS
  const typeText = info.components.input.type.text;
  const typeDate = info.components.input.type.date;
  const typeWeight = info.components.input.type.weight;
  const typeSets = info.components.input.type.sets;
  const typeNumber = info.components.input.type.number;
  const typeTime = info.components.input.type.time;
  const typeCheckbox = info.components.input.type.checkbox;
  const typeTextArea = info.components.input.type.textarea;
  const typeRounds = info.components.input.type.rounds;
  const typeBirthDay = info.components.input.type.birthDay;
  const typePassword = info.components.input.type.password;

  // ERROR MESSAGES
  const invalidFielMessage = "Campo incorrecto";
  const requiredFieldMessage = "Campo requerido";
  const invalidDateMessage = "Fecha inválida";

  useEffect(() => {
    if (type === typeRounds) {
      setReps("");
      setSets("");
    }

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
        {label && (
          <label className="Input__label" htmlFor="minutes">
            {label}
          </label>
        )}
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
            id="minutes"
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
        {label && (
          <label className="Input__label" htmlFor={"sets"}>
            {label}
          </label>
        )}
        <div className={`Input__container ${errorMessage && "error"}`}>
          {/* SETS */}
          <div className="Input__container--label">
            <p className={`Input__label ${errorMessage && "error"}`}>Sets</p>
            <input
              type="number"
              className="Input__input"
              value={sets}
              name="sets"
              id="sets"
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
        {label && (
          <label className="Input__label" htmlFor="sets">
            {label}
          </label>
        )}
        <div className={`Input__container ${errorMessage && "error"}`}>
          {/* SETS */}
          <div className="Input__container--label">
            <p className={`Input__label ${errorMessage && "error"}`}>Sets</p>
            <input
              type="number"
              className="Input__input"
              value={sets}
              name="sets"
              id={name}
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

  // SCORE RECORD INPUT
  if (type === typeRounds)
    return (
      <div className="Input rounds">
        {label && (
          <label className="Input__label" htmlFor="rounds">
            {label}
          </label>
        )}
        <div className={`Input__container ${errorMessage && "error"}`}>
          {/* Rounds */}
          <input
            type="number"
            className="Input__input"
            value={sets}
            name="rounds"
            id={name}
            min={1}
            placeholder={0}
            readOnly={readOnly}
            disabled={disabled}
            onChange={(event) => {
              if (event.target.value < 0) return setSets(1);
              onChangeHandler(event, sets, setSets);
            }}
          />

          {/* Reps */}
          <span className="Input__sign">X</span>
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

              if (parseInt(event.target.value) === 0 || parseInt(sets) === 0) {
                setValidData(false);
                setErrorMessage(requiredFieldMessage);
              }
            }}
          />
        </div>
        <div className={`Input__error ${errorMessage && "show"}`}>
          <img className="Input__error-icon" src={ErrorIcon} alt="Error icon" />
          <p className="Input__error-message">{errorMessage}</p>
        </div>
      </div>
    );
  if (type === typeBirthDay)
    return (
      <div className="Input birthday">
        {label && (
          <label className="Input__label" htmlFor="sets">
            {label}
          </label>
        )}
        <div className={`Input__container ${errorMessage && "error"}`}>
          {/* SETS */}
          <div className="Input__container--label">
            <p className={`Input__label ${errorMessage && "error"}`}>Día</p>
            <input
              type="number"
              className="Input__input"
              value={sets}
              name="sets"
              id={name}
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
          <div className="Input__container--label">
            <p className={`Input__label ${errorMessage && "error"}`}>Mes</p>
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

  // TEXTAREA INPUT
  if (type === typeTextArea)
    return (
      <div className="Input textarea">
        {label && (
          <label className="Input__label" htmlFor={name}>
            {label}
          </label>
        )}
        <div
          className={`Input__container ${errorMessage && "error"}`}
          onBlur={(event) =>
            event.target.value === ""
              ? setErrorMessage(requiredFieldMessage)
              : validateData(event.target.value)
          }
        >
          <textarea
            className="Input__input"
            name={name}
            id={name}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChangeHandler(event, value, setValue)}
          />
        </div>
        <div className={`Input__error ${errorMessage && "show"}`}>
          <img className="Input__error-icon" src={ErrorIcon} alt="Error icon" />
          <p className="Input__error-message">{errorMessage}</p>
        </div>
      </div>
    );

  // OTHER INPUT TYPES (NUMBER, TEXT, DATE, EMAIL, PASSWORD)
  return (
    <div className={`Input ${name}`}>
      {label && (
        <label className="Input__label" htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={`Input__container ${errorMessage && "error"}`}
        onBlur={(event) =>
          event.target.value === ""
            ? setErrorMessage(requiredFieldMessage)
            : validateData(event.target.value)
        }
      >
        <input
          type={showPassword ? typeText : type}
          className="Input__input"
          placeholder={placeholder}
          value={value}
          name={name}
          id={name}
          max={max}
          min={min}
          disabled={disabled}
          readOnly={readOnly}
          onChange={(event) => {
            if (type === typeNumber && event.target.value < 0)
              return setValue(0);
            onChangeHandler(event, value, setValue);
          }}
        />
        {type !== typeDate && (
          <p className={`Input__units ${errorMessage && "error"}`}>{units}</p>
        )}
        {type === typePassword && props.allowShowPassword&& (
          <img
            onClick={() => setShowPassword(!showPassword)}
            src={showPassword ? VisibleIcon : InvisibleIcon}
            alt={showPassword ? "Eye icon" : "Close eye icon"}
          />
        )}
        {type === typeDate && (
          <p
            className={`Input__units button ${errorMessage && "error"}`}
            onClick={() => {
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
    if (onChangeCallback) newValue = onChangeCallback(newValue, value);
    setFunction(newValue);
  }

  // FUNCTION TO VALIDATE DATA BASED ON VALIDATION HANDLER
  function validateData(value, extraVal) {
    // if(type === typePassword) console.log(value);
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
