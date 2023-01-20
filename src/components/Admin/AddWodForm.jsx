import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM HOOKS
import { useWods } from "../../hooks/useWods";
import { useWodCategories } from "../../hooks/useWodCategories";
import { useDashboard } from "../../contexts/DashboardContext";

// COMPONENTS
import { Button } from "../Public/Button";
import { Input } from "../Public/Input";
import { Select } from "../Public/Select";

import { info } from "../../utils/info";
import ClockIcon from "../../assets/icon/time.svg";
import DescriptionIcon from "../../assets/icon/description.svg";
import CalendarIcon from "../../assets/icon/calendar-date.svg";
import TitleIcon from "../../assets/icon/title.svg";

// TODO - Add validation to the form
// TODO - Add a loading state to the form
// TODO - Add a success state to the form
// TODO - Add a failure state to the form

function AddWodForm() {
  const { wods, loading, actions: wodActions, error } = useWods();
  const { wodCategories, actions: wodCategoriesActions } = useWodCategories();

  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useDashboard();
  const navigate = useNavigate();

  const [wodDate, setWodDate] = useState("");
  const [refetch, setRefetch] = useState(true);

  const [submitError, setSubmitError] = useState(false);
  const [validDate, setValidDate] = useState(false);
  const [validWodTitle, setValidWodTitle] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validTimeCap, setValidTimeCap] = useState(false);
  const [validRounds, setValidRounds] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();

    // Fetch wod categories from the database
    if (!wodCategories) wodCategoriesActions.getWodCategories();

    if (error) {
      setErrorMessage(error.message);
    }

    return () => abortCont.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wods, error]);

  function parseDate(date) {
    const newDate = new Date(date);
    const nextDay = new Date(newDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    return nextDay;
  }

  function handleSubmitData(event) {
    event.preventDefault();
    const date = event.target.date.value;
    const wodCat = event.target.category.value;
    const timecap = event.target.timecap.value;
    const rounds = event.target.rounds.value;
    const reps = event.target.reps.value;
    const title = event.target.title.value;
    const description = event.target.description.value;

    // Firebase Keys
    const titleKey = info.firebase.docKeys.wods.title;
    const descriptionKey = info.firebase.docKeys.wods.description;
    const timecapKey = info.firebase.docKeys.wods.timecap;
    const categoryKey = info.firebase.docKeys.wods.category;
    const dateKey = info.firebase.docKeys.wods.date;
    const repsKey = info.firebase.docKeys.wods.reps;
    const roundsKey = info.firebase.docKeys.wods.rounds;
    const timeScoreKey = info.firebase.docKeys.wods.timescore;

    // TODO - Add validation to the form

    const timescore = wodCategories.find(
      (cat) => cat.name === wodCat
    ).timescore;

    const newWod = {
      [titleKey]: title,
      [descriptionKey]: description,
      [timecapKey]: parseInt(timecap),
      [categoryKey]: wodCat,
      [dateKey]: parseDate(date),
      [repsKey]: reps,
      [roundsKey]: rounds,
      [timeScoreKey]: timescore,
    };

    wodActions.postWod(newWod, (error) => {
      if (error) return setErrorMessage(info.messages.error.errorWriting);
      setSuccessMessage(info.messages.success.wodCreated);
      // navigate(info.routes.programming);
    });
  }

  // RENDER
  return (
    <form
      // className="AddWodForm"
      autoComplete="off"
      formNoValidate
      onSubmit={(event) => handleSubmitData(event)}
    >
      <Input
        label={"Fecha"}
        units={"Fecha"}
        type={info.components.input.type.date}
        name={info.components.input.type.date}
        validationHandler={(value) => (!value ? false : true)}
        setValidData={setValidDate}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

      <div className="AddWodForm__input-grid">
        {wodCategories && (
          <Select options={wodCategories} label="Categoría" name="category" />
        )}

        <Input
          type={info.components.input.type.number}
          label={"Timecap"}
          name="timecap"
          placeholder={"00"}
          validationHandler={(value) => {
            if (parseInt(value) <= 0) return false;
            if (!value || value === 0) return false;
            return true;
          }}
          units={"minutos"}
          setValidData={setValidTimeCap}
          submitError={submitError}
          setSubmitError={setSubmitError}
        />

        <Input
          type={info.components.input.type.rounds}
          label={"Rondas x Repeticiones"}
          validationHandler={(values) => {
            if (parseInt(values.reps) === 0) return false;
            if (parseInt(values.sets) === 0) return false;
            return true;
          }}
          setValidData={setValidRounds}
          submitError={submitError}
          setSubmitError={setSubmitError}
        />
      </div>

      <Input
        type={info.components.input.type.text}
        label={"Nombre del WOD"}
        name="title"
        placeholder={"For time, 21-15-9..."}
        validationHandler={(value) => (!value || value == "" ? false : true)}
        setValidData={setValidWodTitle}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

      <Input
        type={info.components.input.type.textarea}
        label={"Descripción (Separar ejercicios con un salto de línea)"}
        name="description"
        placeholder={
          "10 Pull Ups\n20 Push Ups\n30 Air Squats\n(Separar ejercicios con un salto de línea)\n..."
        }
        validationHandler={(value) => (!value || value == "" ? false : true)}
        setValidData={setValidDescription}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

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
