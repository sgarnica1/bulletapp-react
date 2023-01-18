import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../../contexts/DashboardContext";
import { useMovements } from "../../../hooks/useMovements";
import { useAuth } from "../../../contexts/AuthContext";
import { useSkills } from "../../../hooks/useSkills";

// COMPONENTS
import { Button } from "../../Public/Button";
import { Input } from "../../Public/Input";
import { MovementsSelectInput } from "./MovementsSelectInput";
import { SubHeader } from "./SubHeader";

// UTILS
import { info } from "../../../utils/info";
import { utils } from "../../../utils/utils";

const AddSkillForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setSuccessMessage, setErrorMessage } = useDashboard();
  const {
    skills,
    actions: actionsSkills,
    loading: loadingSkills,
    error: errorSkills,
  } = useSkills();
  const {
    movements,
    actions: actionsMov,
    loading: loadingMov,
    error: errorMov,
  } = useMovements();

  // STATES
  const [submitError, setSubmitError] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [existingSkills, setExistingSkills] = useState(new Set());
  const [filteredMovements, setFilteredMovements] = useState([]);
  const [validDate, setValidDate] = useState(false);

  useEffect(() => {
    // FETCH DATA
    if (loadingSkills && !skills)
      actionsSkills.getSkills(user.uid || user.user_id);

    if (skills && loadingMov && !movements) actionsMov.getMovements();

    if (skills && existingSkills.size === 0) {
      const unlocked = skills.map((skill) => skill.movement);
      setExistingSkills(new Set(unlocked));
    }

    if (movements) {
      const selection = movements.filter(
        (mov) => !existingSkills.has(mov.name)
      );
      return setFilteredMovements(selection);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMovement, skills, movements]);

  return (
    <div className="AddRecordForm">
      <SubHeader
        title={"Desbloquea una nueva habilidad"}
        description={"Festejamos contigo este nuevo logro"}
      />

      {/* FORM */}
      <form
        action=""
        className="AddRecordForm__form"
        onSubmit={(event) => submitHandler(event)}
      >
        {/* NEW SKILL */}
        <MovementsSelectInput
          title={"MOVIMIENTO"}
          movements={filteredMovements && filteredMovements}
          skillsOnly={true}
          submitError={submitError}
          setSubmitError={setSubmitError}
          setMovement={setSelectedMovement}
        />

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
    const movName = info.firebase.docKeys.personalRecords.movement;
    const movCat = info.firebase.docKeys.personalRecords.movementCategory;
    const movID = info.firebase.docKeys.personalRecords.idMovement;
    const dateField = info.firebase.docKeys.personalRecords.scores.date;

    // MOVEMENT VALIDATION AND DATA
    if (!event.target.movement.value) return setSubmitError(true);
    const movementData = getMovementData(
      event.target,
      event.target.movement.value
    );

    // VALID DATE
    if (!validDate) return setSubmitError(true);
    console.log("valid date");

    // NEW SKILL DATA
    const newSkill = {
      [movName]: movementData[movName],
      [movCat]: movementData[movCat],
      [movID]: movementData[movID],
      [dateField]: utils.parseDateWithTime(event.target.date.value),
    };

    console.log("submitting...", newSkill);
    // SET ERROR AND SUCCESS MESSAGES
    actionsSkills.postSkill(user.user_id || user.uid, newSkill, (error) => {
      if (error) {
        setErrorMessage(info.messages.error.errorWriting);
        return setSubmitError(true);
      }
      setSuccessMessage("!Nueva habilidad desbloqueada!");
      navigate(info.routes.skills.path);
    });

    // SET ERROR AND SUCCESS MESSAGES
  }
};

export { AddSkillForm };
