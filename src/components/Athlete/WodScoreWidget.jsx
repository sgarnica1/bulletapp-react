import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";
import { useWods } from "../../hooks/useWods";
import { useWodScores } from "../../hooks/useWodScores";

// COMPONENTS
import { Button } from "../Public/Button";
import { AddRegisterWidgetContainer } from "./AddRegisterWidgetContainer";

// LOADING SKELETONS
import { WidgetLoadingSkeleton } from "../Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

const WodScoreWidget = () => {
  const { user } = useAuth();
  const { setSuccessMessage, setErrorMessage } = useDashboard();
  const { wods: wod, loading, error, actions: wodActions } = useWods();
  const {
    wodScores: wodScore,
    loading: wodScoresLoading,
    error: wodScoresError,
    actions: wodScoresActions,
  } = useWodScores();

  // INITIAL STATES
  const [reps, setReps] = useState(0);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (error || wodScoresError) setErrorMessage(error || wodScoresError);
    if (!wod) wodActions.getTodaysWod(); // GET TODAYS WOD

    if (user && wod && wod !== -1 && !wodScore)
      // GET WOD SCORE FROM USER
      wodScoresActions.getWodScoreByUserId(wod.id, user.uid || user.user_id);
    // IF THERE IS A WOD SCORE, SET THE SCORE
    if (wodScore && wodScore.score) {
      if (wod.score_type === info.firebase.values.scoreTypes.time.name) {
        setMinutes(wodScore.score.minutes);
        setSeconds(wodScore.score.seconds);
      } else {
        setReps(parseInt(wodScore?.score?.reps));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wod, wodScore, refetch]);

  // SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    let score;

    // REVIEW SCORE TYPE (TIME OR REPS)
    if (wod.score_type === info.firebase.values.scoreTypes.time.name) {
      // REVIEW EMPTY FIELDS
      if (minutes === "00" && seconds === "00")
        return setErrorMessage(info.messages.error.emptyScore);
      // REVIEW SAME SCORE
      if (
        wodScore &&
        wodScore.score &&
        wodScore.score.minutes === minutes &&
        wodScore.score.seconds === seconds
      )
        return setErrorMessage(info.messages.error.sameScore);
      // SET SCORE
      score = {
        minutes: parseInt(minutes),
        seconds: parseInt(seconds),
      };
    } else {
      // REVIEW EMPTY FIELDS
      if (reps === 0) return setErrorMessage(info.messages.error.emptyScore);
      // REVIEW SAME SCORE
      if (wodScore && wodScore.score && wodScore.score.reps === reps)
        return setErrorMessage(info.messages.error.sameScore);
      // SET SCORE
      score = {
        reps: parseInt(reps),
      };
    }
    // IF THERE IS NO WOD SCORE, POST ONE
    if (!wodScore) {
      setRefetch(!refetch);
      const res = wodScoresActions.postWodScore(
        wod.id,
        user.uid || user.user_id,
        score
      );
      res.then(() => setSuccessMessage(info.messages.success.wodScoreCreated));
      return;
    }

    // IF THERE IS A WOD SCORE, UPDATE IT
    setRefetch(!refetch);
    const res = wodScoresActions.updateWodScore(wodScore.id, score);
    res.then(() => setSuccessMessage(info.messages.success.wodScoreUpdated));
    return;
  };

  // TODO - Handle errors ui
  // TODO - Handle success ui

  if (loading || wodScoresLoading) return <WidgetLoadingSkeleton />;

  // WOD WILL BE -1 IF THERE IS NO WOD FOR TODAY (IT IS A REST DAY)
  if (!loading && !wodScoresLoading && wod && wod !== -1) {
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
          {/* SCORE INPUT */}
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
                  {/* <span>:</span> */}
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
  }
  return null;
};

export { WodScoreWidget };
