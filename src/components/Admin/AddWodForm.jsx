import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM HOOKS
import { useDashboard } from "../../contexts/DashboardContext";
import { useWods } from "../../hooks/useWods";
import { useScoreTypes } from "../../hooks/useScoreTypes";

// COMPONENTS
import { Button } from "../Public/Button";

// INFO
import { info } from "../../utils/info";

// ICONS
import ClockIcon from "../../assets/icon/time.svg";
import DescriptionIcon from "../../assets/icon/description.svg";
import CalendarIcon from "../../assets/icon/calendar-date.svg";
import TitleIcon from "../../assets/icon/title.svg";

// TODO - Add validation to the form
// TODO - Add a loading state to the form
// TODO - Add a success state to the form
// TODO - Add a failure state to the form

function AddWodForm() {
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useDashboard();
  const { scoreTypes, actions: scoreTypesActions } = useScoreTypes();
  const { wods, loading, actions: wodActions } = useWods();
  const navigate = useNavigate();

  const [wodTimeCap, setWodTimeCap] = useState("");
  const [wodDescription, setWodDescription] = useState("");
  const [wodTitle, setWodTitle] = useState("");
  const [wodScoreType, setWodScoreType] = useState("");
  const [wodDate, setWodDate] = useState("");
  const [invalidDate, setInvalidDate] = useState("");
  const [invalidTimeCap, setInvalidTimeCap] = useState(false);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();

    // GET DATA
    if (!scoreTypes) scoreTypesActions.getScoreTypes();

    if (wodDate && refetch) {
      const parsedDate = parseDate(wodDate);
      wodActions.getWodByDate(parsedDate);
      setRefetch(false);
    }

    if (wods && !successMessage) {
      setErrorMessage(`${info.messages.error.wodAlreadyExists}: ${wodDate}`);
      setInvalidDate(info.messages.error.wodAlreadyExists);
      wodActions.resetWodsState();
    }

    return () => abortCont.abort();
  }, [wodDate, wods]);

  function parseDate(date) {
    const newDate = new Date(date);
    const nextDay = new Date(newDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    return nextDay;
  }

  function handleSubmitData(event) {
    event.preventDefault();

    // VALIDATE DATA
    if (!wodTitle || !wodDescription || !wodDate || !wodScoreType) {
      setErrorMessage(info.messages.error.emptyFields);
      return;
    }

    // VALIDATE DATE INPUT
    const date = new Date(wodDate);
    if (date.toString() === "Invalid Date") {
      setErrorMessage(info.messages.error.invalidDate);
      setInvalidDate(info.messages.error.invalidDate);
      return;
    }

    if (wods && !successMessage)
      setErrorMessage(info.messages.error.wodAlreadyExists);

    // VALIDATE TIMECAP
    try {
      const timeCap = parseInt(wodTimeCap);
      if (timeCap < 0) {
        setErrorMessage(info.messages.error.invalidTimeCap);
        setInvalidTimeCap(true);
        return;
      }
    } catch (error) {
      setErrorMessage(info.messages.error.invalidTimeCap);
      setInvalidTimeCap(true);
      return;
    }

    const wod = {
      [info.firebase.docKeys.wods.timecap]: wodTimeCap,
      [info.firebase.docKeys.wods
        .description]: `${wodTitle}, ${wodDescription}`,
      [info.firebase.docKeys.wods.idScoreType]: wodScoreType,
      [info.firebase.docKeys.wods.date]: parseDate(wodDate),
    };

    wodActions.postWod(wod, (error) => {
      if (error) return setErrorMessage(info.messages.error.errorWriting);
      setSuccessMessage(info.messages.success.wodCreated);
      navigate(info.routes.programming);
    });
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
            errorMessage === info.messages.error.emptyFields && !wodTitle
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
            placeholder="Título"
            value={wodTitle}
            onChange={(event) => setWodTitle(event.target.value)}
          />
        </div>
        {/* DESCRIPTION INPUT */}
        <div
          className={`AddWodForm__input-container textarea ${
            errorMessage === info.messages.error.emptyFields && !wodDescription
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
            value={wodDescription}
            onChange={(event) => setWodDescription(event.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="AddWodForm__form-column">
        <h2 className="AddWodForm__form-subtitle">Información adicional</h2>
        {/* DATE INPUT */}
        <label className="AddWodForm__form-label">Fecha</label>
        <div
          className={`AddWodForm__input-container ${
            (errorMessage === info.messages.error.emptyFields && !wodDate) ||
            invalidDate
              ? "error"
              : ""
          }`}
        >
          <img
            className="AddWodForm__input-icon"
            src={CalendarIcon}
            alt="Calendar icon"
          />
          <input
            type="date"
            placeholder="Fecha"
            value={wodDate}
            onChange={(event) => {
              setInvalidDate("");
              setRefetch(true);
              setWodDate(event.target.value);
            }}
          />
        </div>
        {invalidDate && <div className="Login__error">{invalidDate}</div>}

        {/* TIMECAP INPUT */}
        <label className="AddWodForm__form-label">Time Cap</label>
        <div
          className={`AddWodForm__input-container timecap ${
            (errorMessage === info.messages.error.emptyFields && !wodTimeCap) ||
            invalidTimeCap
              ? "error"
              : ""
          }`}
        >
          <img
            className="AddWodForm__input-icon"
            src={ClockIcon}
            alt="Clock icon"
          />
          <input
            type="number"
            className="AddWodForm__input-timecap"
            min={0}
            placeholder="0"
            value={wodTimeCap}
            onChange={(event) => {
              if (event.target.value < 0) return setWodTimeCap(0);
              setWodTimeCap(event.target.value);
            }}
          />
          <span className="AddWodForm__timecap-units">MIN</span>
        </div>

        {/* SCORE TYPE INPUT */}
        <label className="AddWodForm__form-label">Tipo de score</label>
        <div
          className={`AddWodForm__input-container ${
            errorMessage === info.messages.error.emptyFields && !wodScoreType
              ? "error"
              : ""
          }`}
        >
          <img
            className="AddWodForm__input-icon"
            src={DescriptionIcon}
            alt="Document icon"
          />
          <select
            onChange={(event) => setWodScoreType(event.target.value)}
            value={wodScoreType}
          >
            <option value={""}>Tipo de score</option>
            {scoreTypes &&
              scoreTypes.map((score) => {
                if (score.name === "weight") return null;
                return (
                  <option key={score.id} value={score.id}>
                    {info.data.scores[score.name]}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        type={info.components.button.type.submit}
        text={loading ? "Cargando..." : "Crear WOD"}
        size={info.components.button.classes.large}
        style={info.components.button.classes.primary}
        fill={true}
        disabled={loading}
      />
    </form>
  );
}

export { AddWodForm };
