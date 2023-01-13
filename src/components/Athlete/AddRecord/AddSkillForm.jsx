import { useState, useEffect } from "react";
import { useMovements } from "../../../hooks/useMovements";

// COMPONENTS
import { BackButton } from "../../Public/BackButton";
import { Button } from "../../Public/Button";
import { ErrorInput } from "../../Public/ErrorInput";
import { MovementsSelectInput } from "./MovementsSelectInput";
import { SubHeader } from "./SubHeader";

// UTILS
import { info } from "../../../utils/info";

const AddSkillForm = ({ previousRoute }) => {
  const { movements, actions: actionsMov, loading, error } = useMovements();

  // STATES
  const [submitError, setSubmitError] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);

  useEffect(() => {
    // FETCH DATA
    if (!movements) actionsMov.getMovements();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMovement]);

  // PERSONAL RECORD (AÑADIR NUEVO PR) AND UNLOCK SKILL (AÑADIR NUEVA HABILIDAD)
  return (
    <div className="AddRecordForm">
      <BackButton link={previousRoute} mb={true} />
      <SubHeader
        title={"Cuéntanos, ¿qué lograste hoy?"}
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
          title={"MOVIMIENTOS"}
          movements={movements && movements}
          skillsOnly={true}
          submitError={submitError}
          setSubmitError={setSubmitError}
          setMovement={setSelectedMovement}
        />

        {/* <ErrorInput
          errorMessage={"Ya tienes un PR registrado para este movimiento"}
          show={prExists}
        /> */}

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

    // MOVEMENT VALIDATION AND DATA
    if (!event.target.movement.value) return setSubmitError(true);
    const movementData = getMovementData(
      event.target,
      event.target.movement.value
    );

    return console.log("submitting...", movementData);

    // SET ERROR AND SUCCESS MESSAGES

    // TODO - CHECK IF PR ALREADY EXISTS
    // TODO - ALLOW PR UPDATE
  }
};

export { AddSkillForm };
