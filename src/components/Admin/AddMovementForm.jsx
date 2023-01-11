import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM HOOKS
import { useDashboard } from "../../contexts/DashboardContext";
import { useMovements } from "../../hooks/useMovements";
import { useScoreTypes } from "../../hooks/useScoreTypes";

// COMPONENTS
import { Button } from "../Public/Button";

// INFO
import { info } from "../../utils/info";

// ICONS
import DescriptionIcon from "../../assets/icon/description.svg";
import TitleIcon from "../../assets/icon/title.svg";

// TODO - Add validation to the form
// TODO - Add a loading state to the form
// TODO - Add a success state to the form
// TODO - Add a failure state to the form

function AddMovementForm() {
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useDashboard();
  const { scoreTypes, actions: scoreTypesActions } = useScoreTypes();
  const { movements, actions: movementActions, error } = useMovements();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scoreType, setScoreType] = useState([]);
  const [movementCategory, setMovementCategory] = useState("");
  const [isSkill, setIsSkill] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();

    // GET DATA
    if (!scoreTypes) scoreTypesActions.getScoreTypes();
    if (!movements) movementActions.getMovementCategories();

    return () => abortCont.abort();
  }, []);

  function handleSubmitData(event) {
    event.preventDefault();

    // TODO - VALIDATE DATA

    const newMovement = {
      [info.firebase.docKeys.movements.name]: title,
      [info.firebase.docKeys.movements.description]: description,
      [info.firebase.docKeys.movements.scoreType]: scoreType,
      [info.firebase.docKeys.movements.movementCategory]: movementCategory,
      [info.firebase.docKeys.movements.isSkill]: isSkill,
    };

    console.log(newMovement);

    movementActions.addMovement(newMovement, (error) => {
      if (error) return setErrorMessage(info.messages.error.errorWriting);
      setSuccessMessage(info.messages.success.movementCreated);
      setTitle("");
      setDescription("");
      setScoreType([]);
      setMovementCategory("");
      setIsSkill(false);
      navigate(info.routes.addMovement);
    });
  }

  function handleCheckBoxChange(event) {
    if (event.target.checked)
      return setScoreType([event.target.value, ...scoreType]);

    const index = scoreType.indexOf(event.target.value);
    scoreType.splice(index, 1);
    setScoreType(scoreType);
  }

  // RENDER
  return (
    <form
      className="AddWodForm"
      autoComplete="off"
      formNoValidate
      onSubmit={(event) => handleSubmitData(event)}
    >
      <div className="AddWodForm__form-column">
        {/* TITLE INPUT */}
        <div
          className={`AddWodForm__input-container ${
            errorMessage === info.messages.error.emptyFields && !title
              ? "error"
              : ""
          }`}
        >
          <img
            className="AddWodForm__input-icon"
            src={TitleIcon}
            alt="T letter"
          />
          <input
            type="text"
            placeholder="Nombre"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        {/* DESCRIPTION INPUT */}
        <div
          className={`AddWodForm__input-container textarea ${
            errorMessage === info.messages.error.emptyFields && !description
              ? "error"
              : ""
          }`}
        >
          <img
            className="AddWodForm__input-icon"
            src={DescriptionIcon}
            alt="Document icon"
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Descripción"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="AddWodForm__form-column">
        <h2 className="AddWodForm__form-subtitle">Información adicional</h2>

        {/* MOVEMENT CATEGORY INPUT */}
        <label className="AddWodForm__form-label">Categoría</label>
        <div
          className={`AddWodForm__input-container ${
            errorMessage === info.messages.error.emptyFields &&
            !movementCategory
              ? "error"
              : ""
          }`}
        >
          <img src={DescriptionIcon} alt="Document icon" />
          <select
            onChange={(event) => setMovementCategory(event.target.value)}
            value={movementCategory}
          >
            <option value={""}>Categoría</option>
            {movements &&
              movements
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((mov) => (
                  <option key={mov.id} value={mov.id}>
                    {mov.name}
                  </option>
                ))}
          </select>
        </div>

        {/* SCORE TYPE INPUT */}
        <label className="AddWodForm__form-label">
          Tipo de score principal
        </label>
        <div
          className={`AddWodForm__input-container ${
            errorMessage === info.messages.error.emptyFields && !scoreType
              ? "error"
              : ""
          }`}
        >
          <img
            className="AddWodForm__input-icon"
            src={DescriptionIcon}
            alt="Document icon"
          />

          {scoreTypes &&
            scoreTypes.map((score) => {
              if (score.name === "rounds") return null;
              return (
                <div key={score.id}>
                  <label htmlFor={info.data.scores[score.name]}>
                    {" "}
                    {info.data.scores[score.name]}
                  </label>
                  <input
                    type="checkbox"
                    value={score.id}
                    name={info.data.scores[score.name]}
                    id={info.data.scores[score.name]}
                    onChange={(event) => handleCheckBoxChange(event)}
                  />
                </div>
              );
            })}
        </div>

        {/* IS SKILL CHECKBOX */}
        <label className="AddWodForm__form-label">Skill</label>
        <div
          className={`AddWodForm__input-container ${
            errorMessage === info.messages.error.emptyFields && !description
              ? "error"
              : ""
          }`}
        >
          <img
            className="AddWodForm__input-icon"
            src={DescriptionIcon}
            alt="Document icon"
          />
          <label htmlFor="isSkill">Marcar como skill</label>
          <input
            type="checkbox"
            name="isSkill"
            id="isSkill"
            onChange={() => setIsSkill(!isSkill)}
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        type={info.components.button.type.submit}
        text={"Añadir"}
        size={info.components.button.classes.large}
        style={info.components.button.classes.primary}
        fill={true}
        disabled={false}
      />
    </form>
  );
}

export { AddMovementForm };
