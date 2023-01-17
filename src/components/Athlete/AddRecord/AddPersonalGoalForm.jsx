import { useState, useEffect } from "react";
import { useMovements } from "../../../hooks/useMovements";

// COMPONENTS

import { Button } from "../../Public/Button";
import { ErrorInput } from "../../Public/ErrorInput";
import { Input } from "../../Public/Input";
import { MovementsSelectInput } from "./MovementsSelectInput";
import { ScoreOptionsRadioButton } from "./ScoreOptionsRadioButton";
import { SubHeader } from "./SubHeader";

// UTILS
import { info } from "../../../utils/info";
import { utils } from "../../../utils/utils";

const AddPersonalGoalForm = () => {
  const { movements, actions: actionsMov, loading, error } = useMovements();

  // STATES
  const [currentRecordCategory, setCurrentRecordCategory] = useState("");
  const [scoreType, setScoreType] = useState();
  const [validScore, setValidScore] = useState(false);
  const [validTimeScore, setValidTimeScore] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [selectedMovement, setSelectedMovement] = useState(null);

  useEffect(() => {
    // FETCH DATA
    if (!movements) actionsMov.getMovements();

    if (currentRecordCategory === "") {
      setCurrentRecordCategory(
        info.firebase.values.recordCategories.maxLift.name
      );
      setScoreType(info.firebase.values.recordCategories.maxLift.score_type);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRecordCategory, selectedMovement]);

  // PERSONAL GOAL (AÑADIR NUEVA META)
  return (
    <div className="AddRecordForm">
      <SubHeader
        title={"¿Qué quieres proponerte lograr?"}
        description={
          "Fija una meta para hacer posible lo que hoy parece imposible"
        }
      />

      {/* FORM */}
      <form
        action=""
        className="AddRecordForm__form"
        onSubmit={(event) => submitHandler(event)}
      >
        {/* SCORE OPTIONS */}
        <ScoreOptionsRadioButton
          currentRecordCategory={currentRecordCategory}
          setRecordCategory={setCurrentRecordCategory}
          setScoreType={setScoreType}
          enableNoScoreOption={true}
        />

        {/* MOVEMENT OPTIONS */}
        <MovementsSelectInput
          title={"MOVIMIENTOS"}
          movements={movements && movements}
          recordCategory={currentRecordCategory}
          scoreType={scoreType}
          submitError={submitError}
          setSubmitError={setSubmitError}
          setMovement={setSelectedMovement}
        />

        {/* TIME SCORE INPUT */}
        {scoreType === info.firebase.values.scoreTypes.time.name && (
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

        {/* REPS / WEIGHT SCORE INPUT */}
        {(scoreType === info.firebase.values.scoreTypes.reps.name ||
          scoreType === info.firebase.values.scoreTypes.weight.name) && (
          <Input
            type="number"
            placeholder="0"
            name="score"
            units={info.firebase.values.scoreTypes[scoreType]?.units}
            validationHandler={(value) =>
              value >= 0 && typeof parseFloat(value) === "number" ? true : false
            }
            setValidData={setValidScore}
            submitError={submitError}
            setSubmitError={setSubmitError}
          />
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

  // FUNCTIONS;
  function getMovementData(target, id) {
    const value = target.querySelector(`#${id}`);
    if (!value) return;
    return {
      [info.firebase.docKeys.personalRecords.idMovement]: value.dataset.id,
      [info.firebase.docKeys.personalRecords.movement]: value.dataset.name,
      [info.firebase.docKeys.personalRecords.movementCategory]:
        value.dataset.category,
    };
  }

  function submitHandler(event) {
    event.preventDefault();

    // CONSTANTS
    const time = info.firebase.values.scoreTypes.time.name;
    const reps = info.firebase.values.scoreTypes.reps.name;
    const weight = info.firebase.values.scoreTypes.weight.name;
    const movName = info.firebase.docKeys.personalRecords.movement;
    const movCat = info.firebase.docKeys.personalRecords.movementCategory;
    const movID = info.firebase.docKeys.personalRecords.idMovement;
    const scoreT = info.firebase.docKeys.personalRecords.score_type;
    const scoreVal = info.firebase.docKeys.personalRecords.scores.value;
    const units = info.firebase.docKeys.personalRecords.units;
    const lbs = info.firebase.values.scoreTypes.weight.units;
    const min = info.firebase.values.scoreTypes.time.units.min;
    const sec = info.firebase.values.scoreTypes.time.units.sec;

    const unlockSkill =
      currentRecordCategory ==
      info.components.addRecordForm.recordCategories.unlockSkill;

    // MOVEMENT VALIDATION AND DATA
    if (!event.target.movement.value) {
      return setSubmitError(true);
    }
    const movementData = getMovementData(
      event.target,
      event.target.movement.value
    );

    if (unlockSkill) {
      return console.log("submitting...", movementData);
    }

    // VALID TIME SCORE
    if (scoreType === time && !validTimeScore) return setSubmitError(true);

    // VALID SCORE
    if (scoreType !== time && !validScore) return setSubmitError(true);

    // GET SCORE
    let score;
    if (scoreType === time) {
      score = utils.timeToSeconds(
        `${event.target.minutes.value}:${event.target.seconds.value}`
      );
    } else if (scoreType) {
      score = event.target.score.value;
    }

    const newGoal = {
      [movName]: movementData[movName],
      [movCat]: movementData[movCat],
      [movID]: movementData[movID],
      [scoreT]: scoreType,
      [scoreVal]: score,
    };

    // // VERIFY SCORETYPE

    if (scoreType === weight) {
      newGoal[units] = lbs;
    } else if (scoreType === reps) {
      newGoal[units] = reps;
    } else if (scoreType === time) {
      newGoal[units] = [min, sec];
    }

    console.log("submitting...", newGoal);
    // SET ERROR AND SUCCESS MESSAGES
    // actionsPRs.postPR(user.user_id || user.uid, newPR);

    // TODO - CHECK IF PR ALREADY EXISTS
    // TODO - ALLOW PR UPDATE
  }
};

export { AddPersonalGoalForm };
