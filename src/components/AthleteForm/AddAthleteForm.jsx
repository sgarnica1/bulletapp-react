import "./athlete-form.scss";
import { API_BASE_URL } from "../../utils/requests";
import { useEffect, useState } from "react";
import { useAthletes } from "../../hooks/useAthletes";
import { useSchedules } from "../../hooks/useSchedules";
import { usePlans } from "../../hooks/usePlans";
import { useNavigate } from "react-router-dom";

function AddAthleteForm(props) {
  const { athletes, actions: athleteActions } = useAthletes();
  const { plans, getPlans } = usePlans();
  const { schedules, getSchedules } = useSchedules();
  const navigate = useNavigate();

  useEffect(() => {
    const abortCont = new AbortController();
    athleteActions.getAthletes(abortCont);
    getPlans();
    getSchedules();
    return () => abortCont.abort();
  }, []);

  const [athlete, setAthlete] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    plan: "",
    schedule: "",
    beneficiary: "",
  });

  function updateAthleteInfo(event, attribute, endpoint) {
    setAthlete((athlete) => {
      if (endpoint) {
        athlete[attribute] = endpoint + event.target.value + "/";
      } else {
        athlete[attribute] = event.target.value;
      }
      return athlete;
    });
  }

  function handleSubmitData(event) {
    event.preventDefault();
    athleteActions.addAthlete(athlete, () => {
      navigate("/atletas");
    });
  }

  return (
    <form
      className="AddAthleteForm"
      autoComplete="off"
      onSubmit={(event) => handleSubmitData(event)}
    >
      <div className="AddAthleteForm__input-container">
        <label htmlFor="firstname">Nombre</label>
        <input
          type="text"
          placeholder="Nombre(s)"
          required
          value={props.first_name}
          onChange={(event) => updateAthleteInfo(event, "first_name")}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <label htmlFor="lastname">Apellidos</label>
        <input
          type="text"
          placeholder="Apellidos"
          required
          value={props.last_name}
          onChange={(event) => updateAthleteInfo(event, "last_name")}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          placeholder="usuario@correo.com"
          value={props.email}
          onChange={(event) => updateAthleteInfo(event, "email")}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <label htmlFor="phoneNumber">Número de teléfono</label>
        <input
          type="number"
          placeholder="Número de teléfono"
          required
          value={props.phone_number}
          onChange={(event) => updateAthleteInfo(event, "phone_number")}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <label htmlFor="plan">Plan</label>
        <select
          required
          onChange={(event) =>
            updateAthleteInfo(event, "plan", `${API_BASE_URL}/plans/`)
          }
          value={props.plan?.id}
        >
          <option value={""}>Selecciona un plan</option>
          {plans &&
            plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
        </select>
      </div>
      <div className="AddAthleteForm__input-container">
        <label htmlFor="group">Clase</label>
        <select
          required
          onChange={(event) =>
            updateAthleteInfo(event, "schedule", `${API_BASE_URL}/schedule/`)
          }
          value={props.schedule?.id}
        >
          <option value="">Selecciona una clase</option>
          {schedules &&
            schedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.hour}
              </option>
            ))}
        </select>
      </div>

      <div className="AddAthleteForm__input-container">
        <label htmlFor="group">Beneficiario (opcional)</label>
        <select
          onChange={(event) =>
            updateAthleteInfo(event, "beneficiary", `${API_BASE_URL}/athletes/`)
          }
        >
          <option value="">Selecciona un atleta</option>
          {athletes &&
            athletes.map((athlete) => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.first_name} {athlete.last_name}
              </option>
            ))}
        </select>
      </div>

      <button type="submit" className="AddAthleteForm__submit-btn">
        Guardar
      </button>
    </form>
  );
}

export { AddAthleteForm };
