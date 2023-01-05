import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useWods } from "../../hooks/useWods";
import { useWodScores } from "../../hooks/useWodScores";

// COMPONENTS
import { Button } from "../Public/Button";
import { AddRegisterWidgetContainer } from "./AddRegisterWidgetContainer";
// UTILS
import { utils } from "../../utils/utils";
import { info } from "../../utils/info";

const BulletGoalWidget = () => {
  const [reps, setReps] = useState(0);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [refetch, setRefetch] = useState(false);

  // MOCK INFO
  const loading = false;
  const error = false;
  const wodScoresLoading = false;
  const wod = {
    score_type: info.firebase.values.scoreTypes.reps.name,
  };
  const wodScore = {};

  useEffect(() => {
    console.log("Bullet Goal Widget");
  }, []);

  // SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding Bullet goal score...");
  };

  // TODO - Handle errors ui
  // TODO - Handle success ui

  return (
    <AddRegisterWidgetContainer
      title="Reto Bullet"
      description="Max Burpees (5 min)"
      error={error}
      date={true}
    >
      <form
        action=""
        className="AddRegisterWidget__form"
        onSubmit={(event) => handleSubmit(event)}
      >
        {/* LOADING INPUT */}
        {wodScoresLoading && (
          <div className="AddRegisterWidget__form__input-score">Loading...</div>
        )}
        {/* TIME INPUT */}
        {!wodScoresLoading && (
          <div className="AddRegisterWidget__form__input-score">
            {wod.score_type === info.firebase.values.scoreTypes.time.name && (
              <div className="AddRegisterWidget__form__input-container">
                <input
                  type="number"
                  className="AddRegisterWidget__form__input"
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
                <span>:</span>
                <input
                  type="number"
                  className="AddRegisterWidget__form__input"
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
            {/* REPS INPUT */}
            {wod.score_type === info.firebase.values.scoreTypes.reps.name && (
              <input
                type="number"
                className="AddRegisterWidget__form__input"
                placeholder="0"
                value={reps}
                onChange={(e) => {
                  if (e.target.value < 0) e.target.value = 0;

                  setReps(e.target.value);
                }}
              />
            )}
            <p className="AddRegisterWidget__form__input-units">
              {info.firebase.values.scoreTypes[wod.score_type]?.units}
            </p>
          </div>
        )}
        <Button
          type={info.components.button.type.submit}
          style={info.components.button.classes.secondary}
          size={info.components.button.classes.lg}
          fill={true}
          text={wodScore?.score ? "Actualizar" : "Registrar"}
          disabled={loading || error}
        />
      </form>
    </AddRegisterWidgetContainer>
  );
};

export { BulletGoalWidget };
