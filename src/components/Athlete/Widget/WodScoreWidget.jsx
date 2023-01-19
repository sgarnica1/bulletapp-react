import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useDashboard } from "../../../contexts/DashboardContext";
import { useWods } from "../../../hooks/useWods";
import { useWodScores } from "../../../hooks/useWodScores";

// COMPONENTS
import { Button } from "../../Public/Button";
import { FormWidgetContainer } from "./FormWidgetContainer";

// LOADING SKELETONS
import { WidgetLoadingSkeleton } from "../../Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../../utils/info";
import { utils } from "../../../utils/utils";

const WodScoreWidget = () => {
  const { user } = useAuth();
  const { setSuccessMessage, setErrorMessage } = useDashboard();
  const { wods: wod, loading, error, actions: wodActions } = useWods();
  const {
    loading: wodScoresLoading,
    error: wodScoresError,
    actions: wodScoresActions,
  } = useWodScores();

  // INITIAL STATES
  const [reps, setReps] = useState(0);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [wodScore, setWodScore] = useState("");

  const [wodScoreUpdated, setWodScoreUpdated] = useState(false);

  useEffect(() => {
    if (error || wodScoresError) setErrorMessage(error || wodScoresError);
    if (!wod || wodScoreUpdated) {
      wodActions.getTodaysWod();
      setWodScoreUpdated(false);
    } // GET TODAYS WOD

    // SET WODSCORE IF EXISTS
    if (wod && wod !== -1 && wod.scores) {
      wod.scores.forEach((doc) => {
        if (doc.uid === user.uid || doc.uid === user.user_id) {
          setWodScore(doc);
          setReps(doc.score.reps);
          setMinutes(doc.score.minutes);
          setSeconds(doc.score.seconds);
        }
      });
    }

    if (!wodScoresError && wodScoreUpdated)
      setSuccessMessage(info.messages.success.wodScoreUpdated);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wod, wodScore, wodScoreUpdated]);

  // SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    let score;

    // REVIEW SCORE TYPE (TIME OR REPS)
    if (wod.score_type === info.firebase.values.scoreTypes.time.name) {
      // REVIEW EMPTY FIELDS
      if (minutes == 0 && seconds == 0)
        return setErrorMessage(info.messages.error.emptyScore);
      // REVIEW SAME SCORE
      if (
        wodScore &&
        wodScore.score &&
        wodScore.score.minutes == minutes &&
        wodScore.score.seconds == seconds
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
      const res = wodScoresActions.postWodScore(wod.id, {
        uid: user.uid || user.user_id,
        username: `${user.data.first_name} ${user.data.last_name}`,
        score,
      });

      res.then(() => {
        setSuccessMessage(info.messages.success.wodScoreCreated);
        setWodScoreUpdated(true);
      });
      return;
    }

    // IF THERE IS A WOD SCORE, UPDATE IT
    const res = wodScoresActions.updateWodScore(wod.id, wodScore.id, score);
    res.then(() => setWodScoreUpdated(true));
    return;
  };

  if (loading || wodScoresLoading) return <WidgetLoadingSkeleton />;

  // WOD WILL BE -1 IF THERE IS NO WOD FOR TODAY (IT IS A REST DAY)
  if (!loading && !wodScoresLoading && wod && wod !== -1) {
    return (
      <FormWidgetContainer
        title="¿Cómo te fue hoy?"
        description="Registra tu score del día"
        error={error}
      >
        <form
          className="FormWidgetContainer__form"
          onSubmit={(event) => handleSubmit(event)}
        >
          {/* SCORE INPUT */}
          {!wodScoresLoading && (
            <div className="FormWidgetContainer__form__input-score">
              {wod.score_type === info.firebase.values.scoreTypes.time.name && (
                <div className="FormWidgetContainer__form__input-container">
                  <input
                    type="number"
                    className="FormWidgetContainer__form__input"
                    placeholder="00"
                    value={minutes}
                    max={59}
                    min={0}
                    onChange={(e) => {
                      const formattedValue = utils.formatTimerInput(
                        e.target.value,
                        minutes
                      );
                      setMinutes(formattedValue);
                    }}
                  />
                  <p className="FormWidgetContainer__form__input-units">
                    {info.firebase.values.scoreTypes[wod.score_type]?.units.min}
                  </p>
                  <input
                    type="number"
                    className="FormWidgetContainer__form__input"
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
                  <p className="FormWidgetContainer__form__input-units">
                    {info.firebase.values.scoreTypes[wod.score_type]?.units.sec}
                  </p>
                </div>
              )}
              {wod.score_type === info.firebase.values.scoreTypes.reps.name && (
                <>
                  <input
                    type="number"
                    className="FormWidgetContainer__form__input"
                    placeholder="0"
                    value={reps}
                    onChange={(e) => {
                      if (e.target.value < 0) e.target.value = 0;

                      setReps(e.target.value);
                    }}
                  />
                  <p className="FormWidgetContainer__form__input-units">
                    {info.firebase.values.scoreTypes[wod.score_type]?.units}
                  </p>
                </>
              )}
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
      </FormWidgetContainer>
    );
  }
  return null;
};

export { WodScoreWidget };
