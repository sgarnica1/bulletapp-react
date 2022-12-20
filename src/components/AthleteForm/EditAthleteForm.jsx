import "./athlete-form.scss";
import { API_BASE_URL } from "../../utils/requests";
import { useEffect, useState } from "react";
import { useAthletes } from "../../hooks/useAthletes";
import { useSchedules } from "../../hooks/useSchedules";
import { usePlans } from "../../hooks/usePlans";

function EditAthleteForm(props) {
  const { athletes, actions: athleteActions } = useAthletes();
  const { plans, getPlans } = usePlans();
  const { schedules, getSchedules } = useSchedules();

  useEffect(() => {
    const abortCont = new AbortController();
    athleteActions.getAthletes(abortCont);
    getPlans();
    getSchedules();
    return () => abortCont.abort();
  }, []);

  const [firstName, setFirstName] = useState(props.first_name);
  const [lastName, setLastName] = useState(props.last_name);
  const [email, setEmail] = useState(props.email);
  const [phoneNumber, setPhoneNumber] = useState(props.phone_number);
  const [plan, setPlan] = useState(props.plan.id);
  const [schedule, setSchedule] = useState(props.schedule.id);
  const [beneficiary, setBeneficiary] = useState(
    props.beneficiary ? props.beneficiary.id : ""
  );

  function handleSubmitData(event) {
    event.preventDefault();

    let athlete = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      plan: `${API_BASE_URL}/plans/${plan}/`,
      schedule: `${API_BASE_URL}/schedule/${schedule}/`,
      beneficiary:
        beneficiary === "" ? "" : `${API_BASE_URL}/athletes/${beneficiary}/`,
    };

    athleteActions.updateAthlete(athlete, props.id, props.onRefetch);
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
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <label htmlFor="lastname">Apellidos</label>
        <input
          type="text"
          placeholder="Apellidos"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          placeholder="usuario@correo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <label htmlFor="phoneNumber">Número de teléfono</label>
        <input
          type="number"
          placeholder="Número de teléfono"
          required
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <label htmlFor="plan">Plan</label>
        <select
          required
          onChange={(event) => setPlan(event.target.value)}
          value={plan}
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
          onChange={(event) => setSchedule(event.target.value)}
          value={schedule}
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
          onChange={(event) => setBeneficiary(event.target.value)}
          value={beneficiary}
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
        Guardar cambios
      </button>
    </form>
  );
}

export { EditAthleteForm };
