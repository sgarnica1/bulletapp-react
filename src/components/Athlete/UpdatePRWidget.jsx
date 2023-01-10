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

const UpdatePRWidget = ({ title, description }) => {
  const [reps, setReps] = useState("");
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
    console.log("Update PR Form");
  }, []);

  // SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating PR...");
  };

  // TODO - Handle errors ui
  // TODO - Handle success ui

  return (
    <AddRegisterWidgetContainer
      title="Actualizar PR"
      description="Se siente bien superarse a uno mismo"
      error={error}
    >
      <form
        action=""
        className="AddRegisterWidget__form"
        onSubmit={(event) => handleSubmit(event)}
      >
        {/* LOADING INPUT */}
        {wodScoresLoading && (
          <input
            type="text"
            readOnly
            className="AddRegisterWidget__form__input"
          />
        )}
        {/* TIME INPUT */}
        {!wodScoresLoading &&
          wod.score_type === info.firebase.values.scoreTypes.time.name && (
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
        {!wodScoresLoading &&
          wod.score_type === info.firebase.values.scoreTypes.reps.name && (
            <input
              type="number"
              className="AddRegisterWidget__form__input"
              placeholder="lbs"
              value={reps}
              onChange={(e) => {
                if (e.target.value < 0) e.target.value = 0;

                setReps(e.target.value);
              }}
            />
          )}
        <Button
          type={info.components.button.type.submit}
          style={info.components.button.classes.secondary}
          size={info.components.button.classes.sm}
          fill={true}
          text={loading ? "Actualizando..." : "Actualizar"}
          disabled={loading || error}
        />
      </form>
    </AddRegisterWidgetContainer>
  );
};

export { UpdatePRWidget };
