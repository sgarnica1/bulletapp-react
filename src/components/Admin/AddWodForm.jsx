import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM HOOKS
import { useWods } from "../../hooks/useWods";
import { useWodCategories } from "../../hooks/useWodCategories";
import { useDashboard } from "../../contexts/DashboardContext";

// COMPONENTS
import { Button } from "../Public/Button";
import { ButtonSelectFilter } from "../Public/ButtonSelectFilter";
import { DateScore } from "../Athlete/AddRecord/DateScore";
import { InputScore } from "../Athlete/AddRecord/InputScore";
import { InputScoreContainer } from "../Athlete/AddRecord/InputScoreContainer";
import { TextAreaScore } from "../Athlete/AddRecord/TextAreaScore";
import { WidgetLoadingSkeleton } from "../Layout/LoadingSkeletons/WidgetLoadingSkeleton";

import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

function AddWodForm(props) {
  const { wods, actions: wodActions, error } = useWods();
  const {
    wodCategories,
    actions: wodCategoriesActions,
    loading: loadingCategories,
  } = useWodCategories();

  const { setSuccessMessage, setErrorMessage } = useDashboard();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(() =>
    props.category ? props.category : "all"
  );
  const [rounds, setRounds] = useState(() =>
    props.rounds ? props.rounds : ""
  );
  const [reps, setReps] = useState(() => (props.reps ? props.reps : ""));
  const [timecap, setTimecap] = useState(() =>
    props.timecap ? props.timecap : ""
  );
  const [wodTitle, setWodTitle] = useState(() =>
    props.title ? props.title : ""
  );
  const [wodDescription, setWodDescription] = useState(() =>
    props.description ? props.description : ""
  );
  const [wodDate, setWodDate] = useState(() =>
    props.date ? utils.formatISODate(new Date(props.date.seconds * 1000)) : ""
  );

  const [submitLoading, setSubmitLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();

    // Fetch wod categories from the database
    if (!wodCategories) wodCategoriesActions.getWodCategories();

    if (error) {
      setErrorMessage(error.message);
      setSubmitLoading(false);
    }

    return () => abortCont.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wods, error]);

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

      <p className="WodScoreForm__label">Fecha </p>
      <InputScoreContainer gridColumns={1}>
        <DateScore value={wodDate} setValue={setWodDate} />
      </InputScoreContainer>

      <p className="app-meta-tag white">Puntaje</p>
      <InputScoreContainer gridColumns={3}>
        <InputScore value={rounds} setValue={setRounds} label="rounds" />
        <InputScore value={reps} setValue={setReps} label="reps" />
        <InputScore value={timecap} setValue={setTimecap} label="Timecap" />
      </InputScoreContainer>

      <p className="WodScoreForm__label">Nombre del WOD </p>
      <InputScoreContainer gridColumns={1}>
        <InputScore
          value={wodTitle}
          setValue={setWodTitle}
          type="text"
          placeholder="For time, 21-15-9..."
        />
      </InputScoreContainer>

      <p className="WodScoreForm__label">
        Descripción (Separar ejercicios con un salto de línea){" "}
      </p>
      <InputScoreContainer gridColumns={1}>
        <TextAreaScore
          value={wodDescription}
          setValue={setWodDescription}
          placeholder={
            "10 Pull Ups\n20 Push Ups\n30 Air Squats\n(Separar ejercicios con un salto de línea)\n..."
          }
        />
      </InputScoreContainer>

      {validationError && <div className="Login__error">{validationError}</div>}

      {/* SUBMIT BUTTON */}
      <Button
        type={info.components.button.type.submit}
        text={
          submitLoading ? "Cargando..." : props.id ? "Actualizar" : "Crear WOD"
        }
        size={info.components.button.classes.lg}
        style={info.components.button.classes.primary}
        fill={true}
        disabled={submitLoading}
      />
    </form>
  );

  function parseDate(date) {
    const newDate = new Date(date);
    const nextDay = new Date(newDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    return nextDay;
  }

  function handleSubmitData(event) {
    event.preventDefault();

    // Firebase Keys
    const titleKey = info.firebase.docKeys.wods.title;
    const descriptionKey = info.firebase.docKeys.wods.description;
    const timecapKey = info.firebase.docKeys.wods.timecap;
    const categoryKey = info.firebase.docKeys.wods.category;
    const dateKey = info.firebase.docKeys.wods.date;
    const repsKey = info.firebase.docKeys.wods.reps;
    const roundsKey = info.firebase.docKeys.wods.rounds;
    const timeScoreKey = info.firebase.docKeys.wods.timescore;
    const teamsKey = info.firebase.docKeys.wods.teams;

    if (selectedCategory === "all")
      return setValidationError("Selecciona una categoría");
    if (!wodDate) return setValidationError("Selecciona una fecha");
    if (!rounds || rounds === "0" || parseInt(rounds) === 0)
      return setValidationError("Define un número de rondas");
    if (!reps || reps === "0" || parseInt(reps) === 0)
      return setValidationError("Define un número de reps");
    if (!timecap || timecap === "0" || parseInt(timecap) === 0)
      return setValidationError("Define un timecap");
    if (!wodTitle) return setValidationError("Ingresa un nombre para el WOD");
    if (!wodDescription) return setValidationError("Ingresa una descripción");

    setSubmitLoading(true);
    setValidationError(null);

    const timescore = wodCategories.find(
      (cat) => cat.name === selectedCategory
    ).timescore;

    const newWod = {
      [titleKey]: wodTitle,
      [descriptionKey]: wodDescription,
      [timecapKey]: parseInt(timecap),
      [categoryKey]: selectedCategory,
      [dateKey]: parseDate(wodDate),
      [repsKey]: parseInt(reps),
      [roundsKey]: parseInt(rounds),
      [timeScoreKey]: timescore,
      [teamsKey]: false,
    };

    if (selectedCategory === "TEAMS") newWod[teamsKey] = true;

    if (props.id) {
      wodActions.updateWod(props.id, newWod, props.date, (error) => {
        if (error) {
          setSubmitLoading(false);
          return setErrorMessage(info.messages.error.errorWriting);
        }
        setSuccessMessage(info.messages.success.wodUpdated);
        navigate(info.routes.programming.nested.wods.path);
        setSubmitLoading(false);
      });

      return;
    }

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
}

export { AddWodForm };
