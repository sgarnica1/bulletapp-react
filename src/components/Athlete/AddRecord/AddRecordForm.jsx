import { useState, useEffect } from "react";
import { useDashboard } from "../../../contexts/DashboardContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useRecords } from "../../../hooks/useRecords";
import { useSkills } from "../../../hooks/useSkills";

// COMPONENTS
import { Button } from "../../Public/Button";
import { Input } from "../../Public/Input";
import { SubHeader } from "./SubHeader";

// UTILS
import { info } from "../../../utils/info";
import { utils } from "../../../utils/utils";
import LockIcon from "../../../assets/icon/lock.svg";

const AddRecordForm = ({
  movementID,
  movementName,
  movementCategories,
  update = false,
  timescore = false,
  isSkill = false,
  setRefetch,
}) => {
  const { user } = useAuth();
  const { setSuccessMessage, setErrorMessage } = useDashboard();
  const { records, actions } = useRecords();
  const { actions: skillsActions } = useSkills();

  // STATES
  const [weightScore, setWeightScore] = useState(false);
  const [validScore, setValidScore] = useState(false);
  const [validTimeScore, setValidTimeScore] = useState(false);
  const [validDate, setValidDate] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const barbell = info.firebase.values.movementCategories.barbell;
    if (movementCategories.includes(barbell)) setWeightScore(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records]);

  return (
    <div className="AddRecordForm">
      <SubHeader
        title={
          isSkill && !update
            ? "Desbloquear habilidad"
            : "Añade una nueva marca personal"
        }
        description={
          isSkill && !update
            ? "Añade tu primer registro y desbloquea esta habilidad"
            : "Cuéntanos, ¿qué lograste hoy?"
        }
        icon={isSkill ? LockIcon : null}
      />

      {/* FORM */}
      <form
        action=""
        className="AddRecordForm__form"
        onSubmit={(event) => submitHandler(event)}
      >
        {/* DATE INPUT */}
        <p className="meta-tag">Fecha</p>
        <Input
          type={info.components.input.type.date}
          name={info.components.input.type.date}
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

        {/* TIME SCORE INPUT */}
        <p className="meta-tag">Registro</p>
        {timescore && (
          <Input
            type={info.components.input.type.time}
            placeholder="00"
            setValidData={setValidTimeScore}
            validationHandler={(min, sec) => {
              if (parseInt(min) === 0 && parseInt(sec) === 0) return false;
              if (min > 59 || min < 0 || sec > 59 || sec < 0) return false;
              return true;
            }}
            onChangeCallback={utils.formatTimerInput}
            submitError={submitError}
            setSubmitError={setSubmitError}
          />
        )}

        {/* REPS / WEIGHT SCORE INPUT*/}
        {!timescore && weightScore && (
          <Input
            type={info.components.input.type.weight}
            validationHandler={(values) => {
              if (parseInt(values.reps) === 0) return false;
              if (parseInt(values.sets) === 0) return false;
              if (parseInt(values.score) === 0) return false;
              return true;
            }}
            setValidData={setValidScore}
            submitError={submitError}
            setSubmitError={setSubmitError}
          />
        )}

        {/* REPS SCORE INPUT*/}
        {!timescore && !weightScore && (
          <Input
            type={info.components.input.type.sets}
            validationHandler={(values) => {
              if (parseInt(values.reps) === 0) return false;
              if (parseInt(values.sets) === 0) return false;
              return true;
            }}
            setValidData={setValidScore}
            submitError={submitError}
            setSubmitError={setSubmitError}
          />
        )}

        {movementCategories.includes(
          info.firebase.values.movementCategories.bodyweight
        ) && (
          <Input
            type={info.components.input.type.checkbox}
            checkboxLabel={"Agregar peso"}
            setChecked={setWeightScore}
          />
        )}

        {/* SUBMIT BUTTON */}
        <Button
          text={
            submitLoading
              ? "Cargando..."
              : isSkill && !update
              ? "Desbloquear"
              : "Añadir"
          }
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
    const uid = user.user_id || user.uid;

    const movName = info.firebase.docKeys.personalRecords.movement;
    const movCat = info.firebase.docKeys.personalRecords.movementCategory;
    const movID = info.firebase.docKeys.skills.movementId;
    const weightVal = info.firebase.docKeys.records.scores.weight;
    const repsVal = info.firebase.docKeys.records.scores.reps;
    const setsVal = info.firebase.docKeys.records.scores.sets;
    const dateField = info.firebase.docKeys.records.scores.date;
    const units = info.firebase.docKeys.records.scores.units;
    const secondsRef = info.firebase.docKeys.records.scores.seconds;
    const timescoreRef = info.firebase.docKeys.records.timescore;

    const secondsUnits = info.firebase.values.scoreTypes.time.units.sec;
    const repsUnits = info.firebase.values.scoreTypes.reps.units;

    const repsScore = !timescore && parseFloat(event.target.reps.value);
    const setsScore = !timescore && parseFloat(event.target.sets.value);

    // VALID DATE
    if (!validDate) return setSubmitError(true);
    // console.log("valid date");

    // VALID TIME SCORE
    if (timescore && !validTimeScore) return setSubmitError(true);

    // VALID SCORE
    if (!timescore && weightScore && !validScore) return setSubmitError(true);
    // console.log("valid score");

    // VALID REPS
    if (!timescore && (repsScore < 0 || typeof repsScore !== "number"))
      return setSubmitError(true);

    // VALID SETS
    if (!timescore && (setsScore < 0 || typeof setsScore !== "number"))
      return setSubmitError(true);

    // GET SCORE
    const score = timescore
      ? utils.timeToSeconds(
          `${event.target.minutes.value}:${event.target.seconds.value}`
        )
      : weightScore
      ? event.target.weight.value
      : 0;

    // NEW RECORD DATA
    const newPR = {
      [movName]: movementName,
      [movCat]: movementCategories,
      [repsVal]: !timescore ? parseFloat(event.target.reps.value) : 0,
      [setsVal]: !timescore ? parseFloat(event.target.sets.value) : 0,
      [dateField]: utils.parseDateWithTime(event.target.date.value),
      [units]: timescore
        ? secondsUnits
        : weightScore
        ? event.target.units.value
        : repsUnits,
      [secondsRef]: timescore ? score : 0,
      [weightVal]: !timescore ? score : 0,
      [timescoreRef]: timescore,
    };

    // NEW SKILL DATA
    const newSkill = {
      [movName]: movementName,
      [movID]: movementID,
      [dateField]: utils.parseDateWithTime(event.target.date.value),
    };

    // UPDATE LAST RECORD
    actions.updateLatestAcivity(uid, newPR, newSkill, !update && isSkill);

    // UNLOCK SKILL
    console.log("submitting...", newSkill);
    if (!update && isSkill) {
      skillsActions.postSkill(uid, newSkill, (error) => {
        if (error) {
          setErrorMessage(info.messages.error.errorWriting);
          return setSubmitError(true);
        }
        setSuccessMessage("Nueva habilidad desbloqueada");
        setRefetch(true);
      });
    }

    // UPDATE RECORD
    console.log("submitting...", newPR);
    if (update) {
      actions.updateRecord(uid, movementID, newPR, (error) => {
        if (error) {
          setErrorMessage(info.messages.error.errorWriting);
          setSubmitLoading(false);
          return setSubmitError(true);
        }
        setSuccessMessage("Record actualizado correctamente");
        setRefetch(true);
        setSubmitLoading(false);
      });
      return;
    }

    // SUBMIT RECORD
    actions.postRecord(uid, movementID, newPR, (error) => {
      if (error) {
        setErrorMessage(info.messages.error.errorWriting);
        setSubmitLoading(false);
        return setSubmitError(true);
      }
      setSuccessMessage("Nuevo record registrado correctamente");
      setRefetch(true);
      setSubmitLoading(false);
    });
  }
};

export { AddRecordForm };
