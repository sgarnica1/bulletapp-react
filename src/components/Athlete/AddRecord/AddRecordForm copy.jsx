import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useMovements } from "../../../hooks/useMovements";
import { usePRs } from "../../../hooks/usePRs";

// COMPONENTS
import { Button } from "../../Public/Button";
import { ErrorInput } from "../../Public/ErrorInput";
import { Input } from "../../Public/Input";

// UTILS
import { info } from "../../../utils/info";
import { utils } from "../../../utils/utils";

const AddRecordForm = ({ recordType }) => {
  const { user } = useAuth();
  const { movements, actions: actionsMov, loading, error } = useMovements();
  const {
    prs,
    actions: actionsPRs,
    loading: loadingPRs,
    error: errorPRs,
  } = usePRs();

  // STATES
  const [currentRecordCategory, setCurrentRecordCategory] = useState("");
  const [scoreType, setScoreType] = useState();
  const [currentMovement, setCurrentMovement] = useState("");
  const [units, setUnits] = useState("");
  const [reps, setReps] = useState("");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  // FUNCTIONS
  function movementChangeHandler(event) {
    const value = event.target.querySelector(`[data-id=${event.target.value}]`);
    if (!value) return;
    setCurrentMovement({
      [info.firebase.docKeys.personalRecords.idMovement]: value.dataset.id,
      [info.firebase.docKeys.personalRecords.movement]: value.dataset.name,
      [info.firebase.docKeys.personalRecords.movementCategory]:
        value.dataset.category,
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log("submitHandler");
    // TODO - DATA VALIDATION
    if (!currentRecordCategory) return;
    if (!currentMovement) return;
    if (!scoreType) return;

    const newPR = {
      [info.firebase.docKeys.personalRecords.movement]:
        currentMovement[info.firebase.docKeys.personalRecords.movement],
      [info.firebase.docKeys.personalRecords.movementCategory]:
        currentMovement[info.firebase.docKeys.personalRecords.movementCategory],
      [info.firebase.docKeys.personalRecords.idMovement]:
        currentMovement[info.firebase.docKeys.personalRecords.idMovement],
      [info.firebase.docKeys.personalRecords.score_type]: scoreType,
      [info.firebase.docKeys.personalRecords.scores.value]: 0,
    };

    // VERIFY SCORETYPE
    if (scoreType === info.firebase.values.scoreTypes.time.name) {
      newPR[info.firebase.docKeys.personalRecords.scores.value] =
        utils.timeToSeconds(`${minutes}:${seconds}`);
    } else if (
      scoreType === info.firebase.values.scoreTypes.reps.name ||
      scoreType === info.firebase.values.scoreTypes.weight.name
    ) {
      newPR[info.firebase.docKeys.personalRecords.scores.value] = reps;
    }

    if (scoreType === info.firebase.values.scoreTypes.weight.name) {
      newPR[info.firebase.docKeys.personalRecords.units] = "lbs";
    } else if (scoreType === info.firebase.values.scoreTypes.reps.name) {
      newPR[info.firebase.docKeys.personalRecords.units] = "reps";
    } else if (scoreType === info.firebase.values.scoreTypes.time.name) {
      newPR[info.firebase.docKeys.personalRecords.units] = ["minutes, seconds"];
    }

    console.log(newPR);
    // SET ERROR AND SUCCESS MESSAGES
    actionsPRs.addPR(user.user_id || user.uid, newPR);

    // TODO - CHECK IF PR ALREADY EXISTS
    // TODO - ALLOW PR UPDATE
  }

  useEffect(() => {
    if (currentRecordCategory === "") {
      setCurrentRecordCategory(
        info.firebase.values.recordCategories.maxLift.name
      );
      setScoreType(info.firebase.values.recordCategories.maxLift.score_type);
    }
    // if (!prs) actionsPRs.getPRs(user?.user_id || user?.uid);
    // if (!movements) actionsMov.getMovements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRecordCategory]);

  // PERSONAL GOAL (AÑADIR NUEVA META)
  if (recordType === info.components.addRecordForm.recordType.personalGoal)
    return (
      <div className="AddRecordForm">
        <header className="AddRecordForm__header">
          <h2 className="AddRecordForm__title">
            ¿Qué quieres proponerte lograr?
          </h2>
          <p className="AddRecordForm__description">
            Fija una meta para hacer posible lo que hoy parece imposible
          </p>
        </header>

        {/* FORM */}
        <form
          action=""
          className="AddRecordForm__form"
          onSubmit={(event) => submitHandler(event)}
        >
          {/* SCORE OPTIONS */}
          <div className="AddRecordForm__radio-btn">
            {Object.values(info.firebase.values.recordCategories).map(
              (cat, index) => {
                if (cat.active) {
                  return (
                    <div
                      className="AddRecordForm__radio-btn-container"
                      key={index}
                      onClick={() => {
                        setCurrentRecordCategory(cat.name);
                        setScoreType(cat.score_type);
                      }}
                    >
                      <div
                        className={`AddRecordForm__radio-btn__input ${
                          currentRecordCategory === cat.name ? "active" : ""
                        }`}
                      >
                        <span></span>
                      </div>
                      <p className="AddRecordForm__radio-btn__label">
                        {cat.name}
                      </p>
                    </div>
                  );
                }
                return null;
              }
            )}
          </div>

          {/* MOVEMENT OPTIONS */}
          <div className="AddRecordForm__select">
            <select className="AddRecordForm__select-input">
              <option value="">EJERCICIO</option>

              {currentRecordCategory !==
                info.components.addRecordForm.recordCategories.unlockSkill &&
                movements &&
                movements
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((mov, index) => {
                    if (mov.score_types.includes(scoreType)) {
                      return <option key={index}>{mov.name}</option>;
                    }
                    return null;
                  })}

              {currentRecordCategory ===
                info.components.addRecordForm.recordCategories.unlockSkill &&
                movements &&
                movements
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((mov, index) => {
                    if (mov.skill)
                      return <option key={index}>{mov.name}</option>;
                    return null;
                  })}
            </select>
          </div>

          {/* SCORE INPUT */}
          {scoreType !== "" && (
            <div className="AddRecordForm__input-score">
              {/* TIME */}
              {scoreType === info.firebase.values.scoreTypes.time.name && (
                <div className="AddRecordForm__input-container">
                  <input
                    type="number"
                    className="AddRecordForm__input"
                    placeholder="00"
                    value={minutes}
                    max={59}
                    min={0}
                    onChange={(e) => {
                      const formattedValue = utils.formatTimerInput(
                        e.target.value,
                        seconds
                      );
                      setMinutes(formattedValue);
                    }}
                  />
                  <p className="AddRecordForm__input-units">
                    {info.firebase.values.scoreTypes[scoreType]?.units.min}
                  </p>
                  <input
                    type="number"
                    className="AddRecordForm__input"
                    placeholder="00"
                    value={seconds}
                    max={59}
                    min={0}
                    onChange={(e) => {
                      const formattedValue = utils.formatTimerInput(
                        e.target.value,
                        seconds
                      );
                      setSeconds(formattedValue);
                    }}
                  />
                  <p className="AddRecordForm__input-units">
                    {info.firebase.values.scoreTypes[scoreType]?.units.sec}
                  </p>
                </div>
              )}
              {/* REPS */}
              {(scoreType === info.firebase.values.scoreTypes.reps.name ||
                scoreType === info.firebase.values.scoreTypes.weight.name) && (
                <>
                  <input
                    type="number"
                    className="AddRecordForm__input"
                    placeholder="0"
                    value={reps}
                    onChange={(e) => {
                      if (e.target.value < 0) e.target.value = 0;

                      setReps(e.target.value);
                    }}
                  />
                  <p className="AddRecordForm__input-units">
                    {info.firebase.values.scoreTypes[scoreType]?.units}
                  </p>
                </>
              )}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <Button
            text="Guardar"
            type={info.components.button.type.submit}
            size={info.components.button.classes.lg}
            style={info.components.button.classes.primary}
            fill={true}
          />
        </form>
      </div>
    );

  // PERSONAL RECORD (AÑADIR NUEVO PR) AND UNLOCK SKILL (AÑADIR NUEVA HABILIDAD)
  return (
    <div className="AddRecordForm">
      <header className="AddRecordForm__header">
        <h2 className="AddRecordForm__title">Cuéntanos, ¿qué lograste hoy?</h2>
        <p className="AddRecordForm__description">
          Festejamos contigo este nuevo logro
        </p>
      </header>

      {/* FORM */}
      <form
        action=""
        className="AddRecordForm__form"
        onSubmit={(event) => submitHandler(event)}
      >
        {/* NEW PR */}
        {recordType ===
          info.components.addRecordForm.recordType.personalRecord && (
          <>
            {/* SCORE OPTIONS */}
            <div className="AddRecordForm__radio-btn">
              {Object.values(info.firebase.values.recordCategories).map(
                (cat, index) => {
                  if (cat.score_type !== "" && cat.active) {
                    return (
                      <div
                        className="AddRecordForm__radio-btn-container"
                        key={index}
                        onClick={() => {
                          setCurrentRecordCategory(cat.name);
                          setScoreType(cat.score_type);
                        }}
                      >
                        <div
                          className={`AddRecordForm__radio-btn__input ${
                            currentRecordCategory === cat.name ? "active" : ""
                          }`}
                        >
                          <span></span>
                        </div>
                        <p className="AddRecordForm__radio-btn__label">
                          {cat.name}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }
              )}
            </div>

            {/* MOVEMENT OPTIONS */}
            <div className="AddRecordForm__select">
              <select
                className="AddRecordForm__select-input"
                onChange={(event) => {
                  movementChangeHandler(event);
                }}
              >
                <option value="">EJERCICIO</option>
                {movements &&
                  movements
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((mov, index) => {
                      if (mov.score_types.includes(scoreType)) {
                        return (
                          <option
                            key={index}
                            data-id={mov.id}
                            data-name={mov.name}
                            data-category={mov.movement_category}
                            value={mov.id}
                          >
                            {mov.name}
                          </option>
                        );
                      }
                      return null;
                    })}
              </select>
            </div>

            {/* SCORE INPUT */}
            <div className="AddRecordForm__input-score">
              {scoreType === info.firebase.values.scoreTypes.time.name && (
                <div className="AddRecordForm__input-container">
                  <input
                    type="number"
                    className="AddRecordForm__input"
                    placeholder="00"
                    value={minutes}
                    max={59}
                    min={0}
                    onChange={(e) => {
                      const formattedValue = utils.formatTimerInput(
                        e.target.value,
                        seconds
                      );
                      setMinutes(formattedValue);
                    }}
                  />
                  <p className="AddRecordForm__input-units">
                    {info.firebase.values.scoreTypes[scoreType]?.units.min}
                  </p>
                  <input
                    type="number"
                    className="AddRecordForm__input"
                    placeholder="00"
                    value={seconds}
                    max={59}
                    min={0}
                    onChange={(e) => {
                      const formattedValue = utils.formatTimerInput(
                        e.target.value,
                        seconds
                      );
                      setSeconds(formattedValue);
                    }}
                  />
                  <p className="AddRecordForm__input-units">
                    {info.firebase.values.scoreTypes[scoreType]?.units.sec}
                  </p>
                </div>
              )}
              {(scoreType === info.firebase.values.scoreTypes.reps.name ||
                scoreType === info.firebase.values.scoreTypes.weight.name) && (
                <>
                  <input
                    type="number"
                    className="AddRecordForm__input"
                    placeholder="0"
                    value={reps}
                    onChange={(e) => {
                      if (e.target.value < 0) e.target.value = 0;

                      setReps(e.target.value);
                    }}
                  />
                  <p className="AddRecordForm__input-units">
                    {info.firebase.values.scoreTypes[scoreType]?.units}
                  </p>
                </>
              )}
            </div>
            <Input
              type="number"
              placeholder="0"
              units={info.firebase.values.scoreTypes[scoreType]?.units}
              validationHandler={() => {}}
            />
          </>
        )}

        {/* NEW SKILL */}
        {recordType === info.components.addRecordForm.recordType.newSkill && (
          <div className="AddRecordForm__select">
            <select className="AddRecordForm__select-input">
              <option value="">EJERCICIO</option>
              {movements &&
                movements
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((mov, index) => {
                    if (mov.skill)
                      return <option key={index}>{mov.name}</option>;
                    return null;
                  })}
            </select>
          </div>
        )}

        {/* <ErrorInput errorMessage="Error" show={true} /> */}

        {/* SUBMIT BUTTON */}
        <Button
          text="Guardar"
          type={info.components.button.type.submit}
          size={info.components.button.classes.lg}
          style={info.components.button.classes.primary}
          fill={true}
        />
      </form>
    </div>
  );
};

export { AddRecordForm };
