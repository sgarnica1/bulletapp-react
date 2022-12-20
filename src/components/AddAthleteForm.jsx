import { API_BASE_URL } from "../utils/requests";
import { useEffect, useState } from "react";
import { useAthletes } from "../hooks/useAthletes";
import { useSchedules } from "../hooks/useSchedules";
import { usePlans } from "../hooks/usePlans";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

// INFO
import { info } from "../utils/info";

// ICONS
import UserIcon from "../assets/icon/user.svg";
import EmailIcon from "../assets/icon/email.svg";
import PhoneIcon from "../assets/icon/phone.svg";
import BirthdayIcon from "../assets/icon/birthday.svg";
import ClassIcon from "../assets/icon/class.svg";

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
        <img
          className="AddAthleteForm__input-icon"
          src={UserIcon}
          alt="User icon"
        />
        <input
          type="text"
          placeholder="Nombre(s)"
          required
          value={props.first_name}
          onChange={(event) => updateAthleteInfo(event, "first_name")}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <img
          className="AddAthleteForm__input-icon"
          src={UserIcon}
          alt="User icon"
        />
        <input
          type="text"
          placeholder="Apellidos"
          required
          value={props.last_name}
          onChange={(event) => updateAthleteInfo(event, "last_name")}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <img
          className="AddAthleteForm__input-icon"
          src={EmailIcon}
          alt="Email icon"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={props.email}
          onChange={(event) => updateAthleteInfo(event, "email")}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <img
          className="AddAthleteForm__input-icon"
          src={EmailIcon}
          alt="Email icon"
        />
        <input
          type="email"
          placeholder="Confirmar correo electrónico"
          value={props.email}
          onChange={(event) => updateAthleteInfo(event, "email")}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <img
          className="AddAthleteForm__input-icon"
          src={PhoneIcon}
          alt="Phone icon"
        />
        <input
          type="number"
          placeholder="Número de teléfono"
          required
          value={props.phone_number}
          onChange={(event) => updateAthleteInfo(event, "phone_number")}
        />
      </div>
      <div className="AddAthleteForm__input-container">
        <img
          className="AddAthleteForm__input-icon"
          src={BirthdayIcon}
          alt="Birthday icon"
        />
        <input
          type="number"
          className="AddAthleteForm__input-short"
          placeholder="Día"
          max={31}
          min={1}
        />
        /
        <select name="" id="">
          <option value="">Mes</option>
          {info.data.months.map((month, index) => {
            return (
              <option key={index} value={month}>
                {month}
              </option>
            );
          })}
        </select>
      </div>
      <div className="AddAthleteForm__input-container">
        <img
          className="AddAthleteForm__input-icon"
          src={ClassIcon}
          alt="Class icon"
        />
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
        <img
          className="AddAthleteForm__input-icon"
          src={ClassIcon}
          alt="Class icon"
        />
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

      <Button
        type={"submit"}
        text={"Guardar"}
        size={"lg"}
        style={"primary"}
        fill={false}
      />
    </form>
  );
}

export { AddAthleteForm };
