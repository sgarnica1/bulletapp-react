import { useState, useEffect } from "react";

// COMPONENTS
import { Button } from "../../components/Public/Button";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

const AddRecordForm = ({ recordType }) => {
  // console.log(recordType, info.components.addRecordForm.recordType)
  const [currentRecordCategory, setCurrentRecordCategory] = useState("");
  const [scoreType, setScoreType] = useState();
  const [reps, setReps] = useState("");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Adding...");
  };

  // console.log(recordCategories);

  const recordCategories = [
    {
      name: "Max Lift",
      score_type: "weight",
      active: true,
    },
    {
      name: "Max Reps",
      score_type: "reps",
      active: true,
    },
    {
      name: "Min Time",
      score_type: "time",
      active: true,
    },
    {
      name: "Desbloquear habilidad",
      score_type: "",
      active: true,
    },
  ];

  const movements = [
    {
      name: "Power Clean",
      score_type: "weight",
    },
    {
      name: "Muscle Ups",
      score_type: "reps",
    },
    {
      name: "Apple Run",
      score_type: "time",
    },
  ];

  const skills = [
    "Bar Muscle Ups",
    "Ring Muscle Ups",
    "Double Unders",
    "Triple Unders",
    "Pistol Squats",
    "Apple Run",
    "C2B",
    "T2B",
    "Pull Ups",
    "Hand Stand",
    "Hand Stand Push Ups",
    "Hand Stand Walk",
  ];

  useEffect(() => {
    if (currentRecordCategory == "") {
      setCurrentRecordCategory(recordCategories[0].name);
      setScoreType(recordCategories[0].score_type);
    }
  }, [currentRecordCategory]);

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
            {recordCategories.map((cat, index) => {
              if (cat.active) {
                return (
                  <div
                    className="AddRecordForm__radio-btn-container"
                    key={index}
                  >
                    <div
                      className={`AddRecordForm__radio-btn__input ${
                        currentRecordCategory === cat.name ? "active" : ""
                      }`}
                      onClick={() => {
                        setCurrentRecordCategory(cat.name);
                        setScoreType(cat.score_type);
                      }}
                    >
                      <span></span>
                    </div>
                    <p className="AddRecordForm__radio-btn__label">
                      {cat.name}
                    </p>
                  </div>
                );
              }
            })}
          </div>
          {/* MOVEMENT OPTIONS */}
          <div className="AddRecordForm__select">
            <select className="AddRecordForm__select-input">
              <option value="">EJERCICIO</option>
              {currentRecordCategory !=
                info.components.addRecordForm.recordCategories.unlockSkill &&
                movements.map((mov, index) => {
                  if (mov.score_type === scoreType) {
                    return <option key={index}>{mov.name}</option>;
                  }
                })}
              {currentRecordCategory ===
                info.components.addRecordForm.recordCategories.unlockSkill &&
                skills.sort().map((skill, index) => {
                  return <option key={index}>{skill}</option>;
                })}
            </select>
          </div>

          {/* SCORE INPUT */}
          {scoreType != "" && (
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
                </div>
              )}
              {(scoreType === info.firebase.values.scoreTypes.reps.name ||
                scoreType === info.firebase.values.scoreTypes.weight.name) && (
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
              )}
              <p className="AddRecordForm__input-units">
                {info.firebase.values.scoreTypes[scoreType]?.units}
              </p>
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
              {recordCategories.map((cat, index) => {
                if (cat.score_type != "" && cat.active) {
                  return (
                    <div
                      className="AddRecordForm__radio-btn-container"
                      key={index}
                    >
                      <div
                        className={`AddRecordForm__radio-btn__input ${
                          currentRecordCategory === cat.name ? "active" : ""
                        }`}
                        onClick={() => {
                          setCurrentRecordCategory(cat.name);
                          setScoreType(cat.score_type);
                        }}
                      >
                        <span></span>
                      </div>
                      <p className="AddRecordForm__radio-btn__label">
                        {cat.name}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
            {/* MOVEMENT OPTIONS */}
            <div className="AddRecordForm__select">
              <select className="AddRecordForm__select-input">
                <option value="">EJERCICIO</option>
                {movements.map((mov, index) => {
                  if (mov.score_type === scoreType) {
                    return <option key={index}>{mov.name}</option>;
                  }
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
                </div>
              )}
              {(scoreType === info.firebase.values.scoreTypes.reps.name ||
                scoreType === info.firebase.values.scoreTypes.weight.name) && (
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
              )}
              <p className="AddRecordForm__input-units">
                {info.firebase.values.scoreTypes[scoreType]?.units}
              </p>
            </div>
          </>
        )}

        {/* NEW SKILL */}
        {recordType === info.components.addRecordForm.recordType.newSkill && (
          <div className="AddRecordForm__select">
            <select className="AddRecordForm__select-input">
              <option value="">EJERCICIO</option>
              {skills.sort().map((skill, index) => {
                return <option key={index}>{skill}</option>;
              })}
            </select>
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
};

export { AddRecordForm };