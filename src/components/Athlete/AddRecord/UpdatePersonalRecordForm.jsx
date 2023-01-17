import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../../contexts/DashboardContext";
import { useAuth } from "../../../contexts/AuthContext";
import { usePRs } from "../../../hooks/usePRs";

// COMPONENTS
import { Button } from "../../Public/Button";
import { Input } from "../../Public/Input";
import { SubHeader } from "./SubHeader";

// UTILS
import { info } from "../../../utils/info";
import { utils } from "../../../utils/utils";

const UpdatePersonalRecordForm = ({ prID, movementName, prScoreType }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setSuccessMessage, setErrorMessage } = useDashboard();
  const { actions: actionsPRs, loading } = usePRs();

  // STATES
  const [validScore, setValidScore] = useState(false);
  const [validTimeScore, setValidTimeScore] = useState(false);
  const [validDate, setValidDate] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prID]);

  return (
    <div className="AddRecordForm">
      <SubHeader
        title={"Acualiza tu PR"}
        description={"Festejamos contigo este nuevo logro"}
      />

      {/* FORM */}
      <form
        action=""
        className="AddRecordForm__form"
        onSubmit={(event) => submitHandler(event)}
      >
        {/* MOVEMENT NAME - READ ONLY VALUE IF UPDATING PR */}
        {prID && <Input type="text" readOnly={true} readValue={movementName} />}

        {/* TIME SCORE INPUT */}
        {prScoreType === info.firebase.values.scoreTypes.time.name && (
          <Input
            type="time"
            placeholder="00"
            setValidData={setValidTimeScore}
            validationHandler={(min, sec) => {
              if (min == 0 && sec == 0) return false;
              if (min > 59 || min < 0 || sec > 59 || sec < 0) return false;
              return true;
            }}
            onChangeCallback={utils.formatTimerInput}
            submitError={submitError}
            setSubmitError={setSubmitError}
          />
        )}

        {/* REPS / WEIGHT SCORE INPUT*/}
        {(prScoreType === info.firebase.values.scoreTypes.reps.name ||
          prScoreType === info.firebase.values.scoreTypes.weight.name) && (
          <Input
            type="number"
            name="score"
            placeholder="0"
            units={info.firebase.values.scoreTypes[prScoreType]?.units}
            validationHandler={(value) =>
              value >= 0 && typeof parseFloat(value) === "number" ? true : false
            }
            setValidData={setValidScore}
            submitError={submitError}
            setSubmitError={setSubmitError}
          />
        )}

        {/* DATE INPUT */}
        <Input
          type="date"
          name="date"
          units={"Fecha"}
          validationHandler={(value) => {
            if (!value) return false;

            const today = new Date();
            const date = new Date(value);
            return date <= today ? true : false;
          }}
          setValidData={setValidDate}
          submitError={submitError}
          setSubmitError={setSubmitError}
        />

        {/* SUBMIT BUTTON */}
        <Button
          text={loading ? "Actualizando..." : "Actualizar"}
          type={info.components.button.type.submit}
          size={info.components.button.classes.lg}
          style={info.components.button.classes.primary}
          fill={true}
        />
      </form>
    </div>
  );

  // FUNCTIONS;

  function submitHandler(event) {
    event.preventDefault();

    // CONSTANTS
    const time = info.firebase.values.scoreTypes.time.name;
    const scoreVal = info.firebase.docKeys.personalRecords.scores.value;
    const dateField = info.firebase.docKeys.personalRecords.scores.date;

    console.log("here");

    // VALID DATE
    if (!validDate) return setSubmitError(true);
    console.log("valid date");

    // VALID TIME SCORE
    if (prScoreType === time && !validTimeScore) return setSubmitError(true);

    // VALID SCORE
    if (prScoreType !== time && !validScore) return setSubmitError(true);
    console.log("valid score");

    // GET SCORE
    let score;
    if (prScoreType === time) {
      score = utils.timeToSeconds(
        `${event.target.minutes.value}:${event.target.seconds.value}`
      );
    } else if (prScoreType) {
      score = event.target.score.value;
    }

    const newPR = {
      [scoreVal]: score,
      [dateField]: utils.parseDateWithTime(event.target.date.value),
    };
    console.log("udpating", user.user_id, prID, newPR);
    return actionsPRs.updatePR(
      user.uid || user.user_id,
      prID,
      newPR,
      (error) => {
        if (error) return setErrorMessage(info.messages.error.errorWriting);
        setSuccessMessage("PR actualizado correctamente");
        navigate(info.routes.prs.path);
      }
    );
  }
};

export { UpdatePersonalRecordForm };
