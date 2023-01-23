import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useDashboard } from "../../../contexts/DashboardContext";
import { useWods } from "../../../hooks/useWods";
import { useWodScores } from "../../../hooks/useWodScores";

// COMPONENTS
import { Button } from "../../Public/Button";
import { InputScore } from "../AddRecord/InputScore";
import { InputScoreContainer } from "../AddRecord/InputScoreContainer";
import { FormWidgetContainer } from "./FormWidgetContainer";
import { SelectButtonCategory } from "../AddRecord/SelectButtonCategory";
import { ButtonSelectFilter } from "../../../components/Public/ButtonSelectFilter";

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
  const [selectedScoreOption, setSelectedScoreOption] = useState("");
  const [scoreOptions] = useState([
    info.components.wodScoreForm.scoreType.onTime,
    info.components.wodScoreForm.scoreType.timeCaped,
  ]);
  const [reps, setReps] = useState("");
  const [rounds, setRounds] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timeCaped, setTimeCaped] = useState("");
  const [wodScore, setWodScore] = useState("");

  const [wodScoreUpdated, setWodScoreUpdated] = useState(false);

  useEffect(() => {
    if (error || wodScoresError) setErrorMessage(error || wodScoresError);
    if (!wod || wodScoreUpdated) {
      wodActions.getTodaysWod();
      setWodScoreUpdated(false);
    } // GET TODAYS WOD

    // SET WODSCORE IF EXISTS
    if (wod && wod !== -1 && wod.scores && selectedScoreOption === "") {
      wod.scores.forEach((doc) => {
        if (doc.uid === user.uid || doc.uid === user.user_id) {
          setWodScore(doc);
          setReps(doc.score.reps);
          setRounds(doc.score.rounds);
          setMinutes(doc.score.minutes);
          setSeconds(doc.score.seconds);
          setTimeCaped(doc.score.timeCaped);
          setSelectedScoreOption(
            !doc.score.timeCaped
              ? info.components.wodScoreForm.scoreType.onTime
              : info.components.wodScoreForm.scoreType.timeCaped
          );
        }
      });
    }

    if (!wodScoresError && wodScoreUpdated)
      setSuccessMessage(info.messages.success.wodScoreUpdated);

    if (selectedScoreOption === info.components.wodScoreForm.scoreType.onTime)
      setTimeCaped(false);
    if (
      selectedScoreOption === info.components.wodScoreForm.scoreType.timeCaped
    )
      setTimeCaped(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wod, wodScore, wodScoreUpdated, selectedScoreOption]);

  if (loading || wodScoresLoading) return <WidgetLoadingSkeleton />;

  // WOD WILL BE -1 IF THERE IS NO WOD FOR TODAY (IT IS A REST DAY)
  if (!loading && !wodScoresLoading && wod && wod !== -1) {
    return (
      <div className="WodScoreForm">
        <h1 className="WodScoreForm__title">¿Cómo te fue hoy?</h1>
        <p className="WodScoreForm__description">Registra tu score del día </p>
        <form
          className="FormWidgetContainer__form"
          onSubmit={(event) => handleSubmit(event)}
        >
          {wod.timescore && (
            <>
              <InputScoreContainer gridColumns={2}>
                {scoreOptions.map((option) => (
                  <SelectButtonCategory
                    key={option}
                    selected={selectedScoreOption === option}
                    value={option}
                    setValue={setSelectedScoreOption}
                  />
                ))}
              </InputScoreContainer>
              {selectedScoreOption ===
                info.components.wodScoreForm.scoreType.onTime && (
                <InputScoreContainer gridColumns={2}>
                  <InputScore
                    value={minutes}
                    setValue={setMinutes}
                    label="min"
                    max={59}
                  />
                  <InputScore
                    value={seconds}
                    setValue={setSeconds}
                    label="seg"
                    max={59}
                  />
                </InputScoreContainer>
              )}
            </>
          )}

          {(!wod.timescore ||
            selectedScoreOption ===
              info.components.wodScoreForm.scoreType.timeCaped) && (
            <InputScoreContainer gridColumns={2}>
              <InputScore value={rounds} setValue={setRounds} label="rounds" />
              <InputScore value={reps} setValue={setReps} label="reps" />
            </InputScoreContainer>
          )}

          <Button
            type={info.components.button.type.submit}
            style={info.components.button.classes.primary}
            size={info.components.button.classes.lg}
            fill={false}
            text={wodScore?.score ? "Actualizar" : "Registrar"}
            disabled={loading || error}
          />
        </form>
      </div>
    );
  }

  return null;

  // SUBMIT FUNCTION
  function handleSubmit(e) {
    e.preventDefault();
    let score;

    // REVIEW SCORE TYPE (TIME OR REPS)
    if (wod.timescore === true && !timeCaped) {
      // REVIEW EMPTY FIELDS
      if (parseInt(minutes) === 0 && parseInt(seconds) === 0)
        return setErrorMessage(info.messages.error.emptyScore);
      // REVIEW SAME SCORE
      if (
        wodScore &&
        wodScore.score &&
        parseInt(wodScore.score.minutes) === parseInt(minutes) &&
        parseInt(wodScore.score.seconds) === parseInt(seconds)
      )
        return setErrorMessage(info.messages.error.sameScore);

      if (wod.timecap < parseInt(minutes) + parseInt(seconds) / 60)
        return setErrorMessage(info.messages.error.scoreGreaterThanTimeCap);
      // SET SCORE
      score = {
        minutes: parseInt(minutes),
        seconds: parseInt(seconds),
        timeCaped: false,
      };
    } else {
      if (parseInt(rounds) === 0 && parseInt(reps) === 0)
        return setErrorMessage(info.messages.error.emptyScore);
      // REVIEW SAME SCORE
      if (
        wodScore &&
        wodScore.score &&
        parseInt(wodScore.score.rounds) === parseInt(rounds) &&
        parseInt(wodScore.score.reps) === parseInt(reps)
      )
        return setErrorMessage(info.messages.error.sameScore);

      if (wod.reps < parseInt(reps) || wod.rounds - 1 < parseInt(rounds))
        return setErrorMessage(info.messages.error.scoreGreaterThanWod);

      let missingReps;
      if (timeCaped) {
        missingReps =
          wod.rounds * wod.reps -
          (parseInt(reps) + parseInt(rounds) * wod.reps);
      }

      // SET SCORE
      score = {
        rounds: parseInt(rounds),
        reps: parseInt(reps),
        timeCaped: wod.timescore ? timeCaped : false,
        missingReps: wod.timescore ? missingReps : null,
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
  }
};

export { WodScoreWidget };
