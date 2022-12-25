import { useEffect, useState } from "react";
import { useAthletes } from "../../hooks/useAthletes";
import { useGroups } from "../../hooks/useGroups";
import { usePlans } from "../../hooks/usePlans";
import { useRoles } from "../../hooks/useRoles";
import { useNavigate } from "react-router-dom";
import { Button } from "../Public/Button";

// INFO
import { info } from "../../utils/info";

// ICONS
import UserIcon from "../../assets/icon/user.svg";
import EmailIcon from "../../assets/icon/email.svg";
import PhoneIcon from "../../assets/icon/phone.svg";
import BirthdayIcon from "../../assets/icon/birthday.svg";
import ClassIcon from "../../assets/icon/class.svg";

// TODO - Add validation to the form
// TODO - Add a loading state to the form
// TODO - Add a success state to the form
// TODO - Add a failure state to the form

function AddAthleteForm(props) {
  const { actions: athleteActions } = useAthletes();
  const { plans, getPlans } = usePlans();
  const { groups, getGroups } = useGroups();
  const { roles, actions: roleActions } = useRoles();
  const navigate = useNavigate();

  const [athlete, setAthlete] = useState({
    [info.firebase.docKeys.users.firstName]: "",
    [info.firebase.docKeys.users.lastName]: "",
    [info.firebase.docKeys.users.email]: "",
    [info.firebase.docKeys.users.phoneNumber]: "",
    [info.firebase.docKeys.users.plan]: "",
    [info.firebase.docKeys.users.schedule]: "",
    [info.firebase.docKeys.users.birthDay]: "",
    [info.firebase.docKeys.users.birthMonth]: "",
    [info.firebase.docKeys.users.role]: "",
  });

  useEffect(() => {
    const abortCont = new AbortController();

    // GET DATA
    getPlans();
    getGroups();
    roleActions.getRoleById(info.firebase.values.roles.athlete);

    // RETURN
    return () => abortCont.abort();
  }, []);

  // HANDLERS
  function updateAthleteInfo(event, attribute) {
    setAthlete((athlete) => {
      // ADD ATHLETE ROLE IF IT DOESN'T HAVE ONE
      if (athlete[info.firebase.docKeys.users.role] === "") {
        athlete[info.firebase.docKeys.users.role] = roles.id;
      }
      // UPDATE ATHLETE ATTRIBUTE
      athlete[attribute] = event.target.value;

      return athlete;
    });
  }

  function handleSubmitData(event) {
    event.preventDefault();
    athleteActions.addAthlete(athlete, () => {
      navigate("/atletas");
    });
  }

  // RENDER
  return (
    <form
      className="AddAthleteForm"
      autoComplete="off"
      onSubmit={(event) => handleSubmitData(event)}
    >
      {/* NAME INPUT */}
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
          onChange={(event) =>
            updateAthleteInfo(event, info.firebase.docKeys.users.firstName)
          }
        />
      </div>
      {/* LAST NAME INPUT */}
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
          onChange={(event) =>
            updateAthleteInfo(event, info.firebase.docKeys.users.lastName)
          }
        />
      </div>
      {/* EMAIL INPUT */}
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
          onChange={(event) =>
            updateAthleteInfo(event, info.firebase.docKeys.users.email)
          }
        />
      </div>
      {/* CONFIRM EMAIL INPUT */}
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
        />
      </div>
      {/* PHONE INPUT */}
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
          onChange={(event) =>
            updateAthleteInfo(event, info.firebase.docKeys.users.phoneNumber)
          }
        />
      </div>
      {/* BIRTHDAY INPUT */}
      <div className="AddAthleteForm__input-container">
        <img
          className="AddAthleteForm__input-icon"
          src={BirthdayIcon}
          alt="Birthday icon"
        />
        <input
          required
          type="number"
          className="AddAthleteForm__input-short"
          placeholder="Día"
          max={31}
          min={1}
          onChange={(event) =>
            updateAthleteInfo(event, info.firebase.docKeys.users.birthDay)
          }
        />
        /
        <select
          required
          onChange={(event) =>
            updateAthleteInfo(event, info.firebase.docKeys.users.birthMonth)
          }
        >
          <option value="">Mes</option>
          {info.data.months.map((month, index) => {
            return (
              <option key={index} value={index + 1}>
                {month}
              </option>
            );
          })}
        </select>
      </div>
      {/* PLANS INPUT */}
      <div className="AddAthleteForm__input-container">
        <img
          className="AddAthleteForm__input-icon"
          src={ClassIcon}
          alt="Class icon"
        />
        <select
          required
          onChange={(event) =>
            updateAthleteInfo(event, info.firebase.docKeys.users.plan)
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
      {/* SCHEDULE INPUT */}
      <div className="AddAthleteForm__input-container">
        <img
          className="AddAthleteForm__input-icon"
          src={ClassIcon}
          alt="Class icon"
        />
        <select
          required
          onChange={(event) =>
            updateAthleteInfo(event, info.firebase.docKeys.users.schedule)
          }
          value={props.schedule?.id}
        >
          <option value="">Selecciona una clase</option>
          {groups &&
            groups.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.hour}
              </option>
            ))}
        </select>
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        type={info.components.button.type.submit}
        text={"Guardar"}
        size={info.components.button.classes.large}
        style={info.components.button.classes.primary}
        fill={false}
      />
    </form>
  );
}

export { AddAthleteForm };
