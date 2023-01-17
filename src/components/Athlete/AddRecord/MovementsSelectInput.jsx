import { useState, useEffect } from "react";
import { useDashboard } from "../../../contexts/DashboardContext";
import { info } from "../../../utils/info";
import ErrorIcon from "../../../assets/icon/error-alert.svg";

const MovementsSelectInput = ({
  title,
  movements,
  recordCategory,
  scoreType,
  skillsOnly,
  resetError,
  submitError,
  setSubmitError,
  setMovement,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (submitError) {
      value === ""
        ? setErrorMessage("Selecciona un movimiento")
        : setErrorMessage("");
    }
    if (resetError) setErrorMessage("");
  }, [submitError, resetError]);

  const unlockSkill =
    info.components.addRecordForm.recordCategories.unlockSkill;

  return (
    <div className="AddRecordForm__select-container">
      <div className={`AddRecordForm__select ${errorMessage && "error"}`}>
        <select
          className="AddRecordForm__select-input"
          onChange={(event) => {
            setSubmitError(false);
            setErrorMessage("");
            setValue(event.target.value);
            setMovement(event.target.value.slice(1)); // RETURN ORIGINAL ID
            if (event.target.value === "")
              setErrorMessage("Selecciona un movimiento");
          }}
          name="movement"
        >
          <option value="">{title}</option>

          {!skillsOnly &&
            recordCategory !== unlockSkill &&
            movements &&
            movements
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((mov, index) => {
                if (mov.score_types.includes(scoreType)) {
                  return (
                    <option
                      key={index}
                      id={`a${mov.id}`} // TO AVOID INVALID SELECTORS
                      data-id={mov.id}
                      data-name={mov.name}
                      data-category={mov.movement_category}
                      value={`a${mov.id}`}
                    >
                      {mov.name}
                    </option>
                  );
                }
                return null;
              })}

          {(skillsOnly || recordCategory === unlockSkill) &&
            movements &&
            movements
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((mov, index) => {
                if (mov.skill)
                  return (
                    <option
                      key={index}
                      id={`a${mov.id}`}
                      data-id={mov.id}
                      data-name={mov.name}
                      data-category={mov.movement_category}
                      value={`a${mov.id}`}
                    >
                      {mov.name}
                    </option>
                  );
                return null;
              })}
        </select>
      </div>
      <div className={`Input__error ${errorMessage && "show"}`}>
        <img className="Input__error-icon" src={ErrorIcon} alt="Error icon" />
        <p className="Input__error-message">{errorMessage}</p>
      </div>
    </div>
  );
};

export { MovementsSelectInput };
