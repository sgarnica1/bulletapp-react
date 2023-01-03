import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useWods } from "../../hooks/useWods";
import { useWodScores } from "../../hooks/useWodScores";

// COMPONENTS
import { Button } from "../Public/Button";
import { AddRegisterWidgetContainer } from "./AddRegisterWidgetContainer";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

const WodScoreWidget = () => {
  const { user } = useAuth();
  const { wods: wod, loading, error, actions: wodActions } = useWods();
  const {
    wodScores: wodScore,
    loading: wodScoresLoading,
    actions: wodScoresActions,
  } = useWodScores();

  // INITIAL STATES
  const [reps, setReps] = useState(0);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (!wod) wodActions.getTodaysWod(); // GET TODAYS WOD

    if (user && wod && wod != -1 && !wodScore)
      // GET WOD SCORE FROM USER
      wodScoresActions.getWodScoreByUserId(wod.id, user.uid || user.user_id);
    // IF THERE IS A WOD SCORE, SET THE SCORE
    if (wodScore && wodScore.score) {
      if (wod.score_type === info.firebase.values.scoreTypes.time.name) {
        setMinutes(wodScore.score.minutes);
        setSeconds(wodScore.score.seconds);
      } else {
        console.log(wodScore.score.reps);
        setReps(parseInt(wodScore?.score?.reps));
      }
    }
  }, [wod, wodScore, refetch]);

  // SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    let score;

    // REVIEW SCORE TYPE (TIME OR REPS)
    if (wod.score_type === info.firebase.values.scoreTypes.time.name) {
      score = {
        minutes: parseInt(minutes),
        seconds: parseInt(seconds),
      };
    } else {
      score = {
        reps: parseInt(reps),
      };
    }
    // IF THERE IS NO WOD SCORE, POST ONE
    if (!wodScore) {
      setRefetch(!refetch);
      return wodScoresActions.postWodScore(
        wod.id,
        user.uid || user.user_id,
        score
      );
    }
    // IF THERE IS A WOD SCORE, UPDATE IT
    setRefetch(!refetch);
    return wodScoresActions.updateWodScore(wodScore.id, score);
  };

  // TODO - Handle errors ui
  // TODO - Handle success ui

  // WOD WILL BE -1 IF THERE IS NO WOD FOR TODAY (IT IS A REST DAY)
  if (wod && wod != -1) {
    return (
      <AddRegisterWidgetContainer
        title="¿Cómo te fue hoy?"
        description="Registra tu score del día"
        error={error}
      >
        <form
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
                placeholder="0"
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
            text={wodScore?.score ? "Actualizar" : "Registrar"}
            disabled={loading || error}
          />
        </form>
      </AddRegisterWidgetContainer>
    );
  }
  return null;
};

export { WodScoreWidget };
