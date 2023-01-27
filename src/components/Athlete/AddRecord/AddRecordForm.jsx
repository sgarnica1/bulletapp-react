import { useState, useEffect } from "react";
import { useDashboard } from "../../../contexts/DashboardContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useRecords } from "../../../hooks/useRecords";
import { useSkills } from "../../../hooks/useSkills";

// COMPONENTS
import { Button } from "../../Public/Button";
import { Input } from "../../Public/Input";
import { InputScore } from "./InputScore";
import { InputScoreContainer } from "./InputScoreContainer";
import { SubHeader } from "./SubHeader";
import { SelectButtonCategory } from "./SelectButtonCategory";

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
  distancescore = false,
  isSkill = false,
  setRefetch,
}) => {
  const { user } = useAuth();
  const { setSuccessMessage, setErrorMessage } = useDashboard();
  const { records, actions } = useRecords();
  const { actions: skillsActions } = useSkills();

  // STATES
  const [validationError, setValidationError] = useState(false);
  const [selectedRegisterType, selectedRetRegisterType] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [distance, setDistance] = useState("");
  const [scoreReadOnly, setScoreReadOnly] = useState(false);
  const [distanceUnits, setDistanceUnits] = useState(
    info.firebase.values.scoreTypes.distance.units.m
  );
  const [registerTypes] = useState(
    timescore || distancescore
      ? [
          info.components.addRecordForm.recordType.bestTime,
          info.components.addRecordForm.recordType.setsXDistance,
        ]
      : [
          info.components.addRecordForm.recordType.oneRepMax,
          info.components.addRecordForm.recordType.setsXReps,
        ]
  );

  const [weightInputVisible, setWeightInputVisible] = useState(false);

  const [validDate, setValidDate] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!weightInputVisible) {
      const barbell = info.firebase.values.movementCategories.barbell;
      if (movementCategories.includes(barbell)) setWeightInputVisible(true);
    }

    if (movementName === "Apple Run") {
      setScoreReadOnly(true);
      setDistance(1200);
    }

    setValidationError(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    records,
    minutes,
    seconds,
    distance,
    weight,
    sets,
    reps,
    selectedRegisterType,
  ]);

  if (isSkill && !update)
    return (
      <div className="AddRecordForm">
        <SubHeader
          title={"¡Felicidades! Festejamos contigo este nuevo logro"}
          description={"Da clic para desbloquear esta habilidad"}
          icon={isSkill ? LockIcon : null}
        />

        {/* FORM */}
        <form
          action=""
          className="AddRecordForm__form"
          onSubmit={(event) => submitHandler(event)}
        >
          <Button
            text={submitLoading ? "Cargando..." : "Desbloquear"}
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
      <SubHeader
        title={"Añade una nueva marca personal"}
        description={"Cuéntanos, ¿Qué lograste hoy?"}
        icon={isSkill ? LockIcon : null}
      />

      {/* FORM */}
      <form
        action=""
        className="AddRecordForm__form"
        onSubmit={(event) => submitHandler(event)}
      >
        {/* TYPE SELECTOR */}
        {registerTypes && (weightInputVisible || distancescore) && (
          <>
            <p className="app-meta-tag white">Selecciona una categoría</p>
            <InputScoreContainer gridColumns={2}>
              {registerTypes.map((type) => (
                <SelectButtonCategory
                  key={type}
                  selected={selectedRegisterType === type}
                  value={type}
                  setValue={selectedRetRegisterType}
                />
              ))}
            </InputScoreContainer>
          </>
        )}

        {/* WEIGHT */}
        {!timescore &&
          selectedRegisterType ===
            info.components.addRecordForm.recordType.setsXReps && (
            <>
              <p className="app-meta-tag white">Puntaje</p>
              <InputScoreContainer gridColumns={3}>
                <InputScore value={sets} setValue={setSets} label="sets" />
                <InputScore value={reps} setValue={setReps} label="reps" />
                <InputScore
                  value={weight}
                  setValue={setWeight}
                  label={info.firebase.values.scoreTypes.weight.units.lbs}
                />
              </InputScoreContainer>
            </>
          )}

        {/* SETS X REPS */}
        {!timescore && !weightInputVisible && !distancescore && (
          <>
            <p className="app-meta-tag white">Progreso</p>
            <InputScoreContainer gridColumns={2}>
              <InputScore value={sets} setValue={setSets} label="sets" />
              <InputScore value={reps} setValue={setReps} label="reps" />
            </InputScoreContainer>
          </>
        )}

        {/* WEIGHT */}
        {!timescore &&
          weightInputVisible &&
          selectedRegisterType ===
            info.components.addRecordForm.recordType.oneRepMax && (
            <>
              <p className="app-meta-tag white">Puntaje</p>
              <InputScoreContainer gridColumns={1}>
                <InputScore
                  value={weight}
                  setValue={setWeight}
                  label={info.firebase.values.scoreTypes.weight.units.lbs}
                />
              </InputScoreContainer>
            </>
          )}

        {/* Time and distance inputs */}
        {distancescore &&
          selectedRegisterType ===
            info.components.addRecordForm.recordType.bestTime && (
            <>
              <p className="app-meta-tag white">Distancia</p>
              <InputScoreContainer gridColumns={1}>
                <InputScore
                  value={distance}
                  setValue={setDistance}
                  options={["m", "km"]}
                  option={distanceUnits}
                  setOption={setDistanceUnits}
                  readOnly={scoreReadOnly}
                />
              </InputScoreContainer>
            </>
          )}

        {/* DISTANCE */}
        {distancescore &&
          selectedRegisterType ===
            info.components.addRecordForm.recordType.setsXDistance && (
            <>
              <p className="app-meta-tag white">Sets x Distancia</p>
              <InputScoreContainer gridColumns={2}>
                <InputScore value={sets} setValue={setSets} label="sets" />
                <InputScore
                  value={distance}
                  setValue={setDistance}
                  options={["m", "km"]}
                  option={distanceUnits}
                  setOption={setDistanceUnits}
                  readOnly={scoreReadOnly}
                />
              </InputScoreContainer>
            </>
          )}

        {/* TIME */}
        {(timescore || distancescore) && (
          <>
            <p className="app-meta-tag white">Tiempo</p>
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
          </>
        )}

        {/* DATE INPUT */}
        <Input
          type={info.components.input.type.date}
          name={info.components.input.type.date}
          label="Fecha de registro"
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

        {validationError && (
          <div className="Login__error">{validationError}</div>
        )}

        {/* SUBMIT BUTTON */}
        <Button
          text={submitLoading ? "Cargando..." : "Añadir registro"}
          type={info.components.button.type.submit}
          size={info.components.button.classes.lg}
          style={info.components.button.classes.primary}
          fill={true}
          disabled={
            ((weightInputVisible || timescore || distancescore) &&
              (selectedRegisterType === "" && !timescore)) ||
            !validDate
          }
        />
      </form>
    </div>
  );

  function submitHandler(event) {
    event.preventDefault();

    // CONSTANTS
    const uid = user.user_id || user.uid;

    // Firebase keys
    const movName = info.firebase.docKeys.personalRecords.movement;
    const movCat = info.firebase.docKeys.personalRecords.movementCategory;
    const movID = info.firebase.docKeys.skills.movementId;
    const weightVal = info.firebase.docKeys.records.scores.weight;
    const distanceVal = info.firebase.docKeys.records.scores.distance;
    const repsVal = info.firebase.docKeys.records.scores.reps;
    const setsVal = info.firebase.docKeys.records.scores.sets;
    const dateField = info.firebase.docKeys.records.scores.date;
    const units = info.firebase.docKeys.records.scores.units;
    const secondsRef = info.firebase.docKeys.records.scores.seconds;
    const timescoreRef = info.firebase.docKeys.records.timescore;
    const distancescoreRef = info.firebase.docKeys.records.distancescore;
    const secondsUnits = info.firebase.values.scoreTypes.time.units.sec;
    const poundsUnits = info.firebase.values.scoreTypes.weight.units.lbs;
    const repsUnits = info.firebase.values.scoreTypes.reps.units;

    const setsXDistance =
      info.components.addRecordForm.recordType.setsXDistance;
    const setsXReps = info.components.addRecordForm.recordType.setsXReps;
    const oneRepMax = info.components.addRecordForm.recordType.oneRepMax;
    const bestTime = info.components.addRecordForm.recordType.bestTime;

    // VALID DATE
    if ((!isSkill && update) || (isSkill && update)) {
      if (
        isNaN(reps) ||
        (selectedRegisterType === setsXReps &&
          (parseInt(reps) === 0 || reps === "" || reps === "0"))
      ) {
        setValidationError("Por favor ingresa un valor válido para 'reps' ");
      }
      if (
        isNaN(sets) ||
        ((selectedRegisterType === setsXDistance ||
          selectedRegisterType === setsXReps) &&
          (parseInt(sets) === 0 || sets === "" || sets === "0"))
      ) {
        return setValidationError(
          "Por favor ingresa un valor válido para 'sets' "
        );
      }
      if (
        isNaN(minutes) ||
        ((selectedRegisterType === setsXDistance ||
          selectedRegisterType === bestTime ||
          timescore) &&
          (parseInt(minutes) === 0 || minutes === "" || minutes === "0") &&
          (parseInt(seconds) === 0 || seconds === "" || seconds === "0"))
      ) {
        return setValidationError(
          "Por favor ingresa un valor válido para 'min' "
        );
      }
      if (
        isNaN(seconds) ||
        ((selectedRegisterType === setsXDistance ||
          selectedRegisterType === bestTime ||
          timescore) &&
          (parseInt(seconds) === 0 || seconds === "" || seconds === "0") &&
          (parseInt(minutes) === 0 || minutes === "" || minutes === "0"))
      ) {
        return setValidationError(
          "Por favor ingresa un valor válido para 'sec' "
        );
      }
      if (
        isNaN(weight) ||
        (selectedRegisterType === oneRepMax &&
          (parseInt(weight) === 0 || weight === "" || weight === "0"))
      ) {
        return setValidationError(
          "Por favor ingresa un valor válido para 'peso' "
        );
      }
      if (
        isNaN(distance) ||
        ((selectedRegisterType === setsXDistance ||
          selectedRegisterType === bestTime) &&
          (parseInt(distance) === 0 || distance === "" || distance === "0"))
      ) {
        return setValidationError(
          "Por favor ingresa un valor válido para 'distancia' "
        );
      }
      if (!validDate) return setSubmitError(true);

      setValidationError(null);
    }

    let unitsVal;
    if (timescore) unitsVal = secondsUnits;
    if (distancescore) unitsVal = distanceUnits;
    if (weightInputVisible) unitsVal = poundsUnits;
    if (!timescore && !distancescore && !weightInputVisible)
      unitsVal = repsUnits;

    let secondsVal;
    if (seconds === "" || seconds === "0") secondsVal = 0;
    else secondsVal = parseInt(seconds);

    let minutesVal;
    if (minutes === "" || minutes === "0") minutesVal = 0;
    else minutesVal = parseInt(minutes);

    const newPR = {
      [movName]: movementName,
      [movCat]: movementCategories,
      [repsVal]: parseInt(reps) === 0 || reps === "" ? 1 : parseInt(reps),
      [setsVal]: parseInt(sets) === 0 || sets === "" ? 1 : parseInt(sets),
      [dateField]:
        !update && isSkill
          ? new Date()
          : utils.parseDateWithTime(event.target.date.value),
      [units]: unitsVal,
      [secondsRef]:
        secondsVal + minutesVal * 60 === 0 ? 0 : secondsVal + minutesVal * 60,
      [weightVal]:
        parseInt(weight) === 0 || weight === "" ? 0 : parseInt(weight),
      [distanceVal]:
        parseInt(distance) === 0 || distance === "" ? 0 : parseInt(distance),
      [timescoreRef]: timescore,
      [distancescoreRef]: distancescore,
    };

    // NEW SKILL DATA
    const newSkill = {
      [movName]: movementName,
      [movID]: movementID,
      [dateField]: new Date(),
    };

    // UPDATE LAST RECORD
    actions.updateLatestAcivity(uid, newPR, newSkill, !update && isSkill);

      // UNLOCK SKILL
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
