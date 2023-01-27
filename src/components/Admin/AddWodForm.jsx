import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM HOOKS
import { useWods } from "../../hooks/useWods";
import { useWodCategories } from "../../hooks/useWodCategories";
import { useDashboard } from "../../contexts/DashboardContext";

// COMPONENTS
import { Button } from "../Public/Button";
import { ButtonSelectFilter } from "../Public/ButtonSelectFilter";
import { Input } from "../Public/Input";
import { WidgetLoadingSkeleton } from "../Layout/LoadingSkeletons/WidgetLoadingSkeleton";

import { info } from "../../utils/info";

// TODO - Add validation to the form
// TODO - Add a loading state to the form
// TODO - Add a success state to the form
// TODO - Add a failure state to the form

function AddWodForm() {
  const { wods, actions: wodActions, error } = useWods();
  const {
    wodCategories,
    actions: wodCategoriesActions,
    loading: loadingCategories,
  } = useWodCategories();

  const { setSuccessMessage, setErrorMessage } = useDashboard();
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [validDate, setValidDate] = useState(true);
  const [validWodTitle, setValidWodTitle] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [validTimeCap, setValidTimeCap] = useState(true);
  const [validRounds, setValidRounds] = useState(true);

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
    setSubmitLoading(true);

    const date = event.target.date.value;
    const wodCat = selectedCategory;
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
    if(!validDate) return setErrorMessage(true);
    if(!validWodTitle) return setErrorMessage(true);
    if(!validDescription) return setErrorMessage(true);
    if(!validTimeCap) return setErrorMessage(true);
    if(!validRounds) return setErrorMessage(true);

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

    console.log(newWod);

    wodActions.postWod(newWod, (error) => {
      if (error) {
        setSubmitLoading(false);
        return setErrorMessage(info.messages.error.errorWriting);
      }
      setSuccessMessage(info.messages.success.wodCreated);
      navigate(info.routes.programming.nested.wods.path);
      setSubmitLoading(false);
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
      <div className="Records__history__list">
        {loadingCategories &&
          new Array(10)
            .fill(0)
            .map((_, index) => (
              <WidgetLoadingSkeleton type="movement-card" key={index} />
            ))}
      </div>

      <p className="app-meta-tag">Selecciona una categoría</p>
      {!loadingCategories && wodCategories && (
        <ButtonSelectFilter
          options={wodCategories.map((cat) => cat.name).sort()}
          value={selectedCategory}
          setValue={setSelectedCategory}
          loading={loadingCategories}
        />
      )}

      <div className="AddWodForm__input-grid">
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
        validationHandler={(value) => (!value || value === "" ? false : true)}
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
        validationHandler={(value) => (!value || value === "" ? false : true)}
        setValidData={setValidDescription}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

      {/* SUBMIT BUTTON */}
      <Button
        type={info.components.button.type.submit}
        text={submitLoading ? "Cargando..." : "Crear WOD"}
        size={info.components.button.classes.lg}
        style={info.components.button.classes.primary}
        fill={true}
        disabled={submitLoading}
      />
    </form>
  );
}

export { AddWodForm };
