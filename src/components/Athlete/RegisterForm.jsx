import { useEffect, useState } from "react";
import { useAthletes } from "../../hooks/useAthletes";
import { useGroups } from "../../hooks/useGroups";
import { usePlans } from "../../hooks/usePlans";
import { useLocations } from "../../hooks/useLocations";

// COMPONENTS
import { Button } from "../../components/Public/Button";
import { Input } from "../../components/Public/Input";

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

function RegisterForm(props) {
  const { actions: athletesActions } = useAthletes();
  const { plans, actions: plansActions } = usePlans();
  const { groups, actions: groupsActions } = useGroups();
  const { locations, actions: locationsActions } = useLocations();

  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validConfirmEmail, setValidConfirmEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [validBirthDay, setValidBirthDay] = useState(false);

  useEffect(() => {
    // const abortCont = new AbortController();
    // // GET DATA
    // plansActions.getPlans();
    // groupsActions.getGroups();
    // locationsActions.getLocations();
    // return () => abortCont.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    [info.firebase.docKeys.users.location]: "",
  });

  function updateAthleteInfo(event, attribute) {
    setAthlete((athlete) => {
      if (athlete[info.firebase.docKeys.users.role] === "") {
        // ADD ATHLETE ROLE IF IT DOESN'T HAVE ONE
        athlete[info.firebase.docKeys.users.role] =
          info.firebase.values.roles.athlete;
      }

      if (athlete[info.firebase.docKeys.users.location] === "") {
        // ADD DEFAULT USER LOCATION
        locations.forEach((loc) => {
          if (loc.name === info.data.locations.juriquilla)
            athlete[info.firebase.docKeys.users.location] = loc.id;
        });
      }

      // UPDATE ATHLETE ATTRIBUTE
      athlete[attribute] = event.target.value;
      return athlete;
    });
  }

  function handleSubmitData(event) {
    event.preventDefault();
    console.log(athlete);
    athletesActions.addAthlete(athlete);
  }

  // RENDER
  return (
    <form
      className="AddAthleteForm__form"
      autoComplete="off"
      onSubmit={(event) => handleSubmitData(event)}
    >
      {/* NAME INPUT */}
      <Input
        type={info.components.input.type.text}
        label={"Nombre (s)"}
        name="first_name"
        placeholder={"Nombre (s)"}
        validationHandler={(value) => (!value || value == "" ? false : true)}
        setValidData={setValidFirstName}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

      {/* LASTNAME INPUT */}
      <Input
        type={info.components.input.type.text}
        label={"Apellidos"}
        name="last_name"
        placeholder={"Apellidos"}
        validationHandler={(value) => (!value || value == "" ? false : true)}
        setValidData={setValidLastName}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

      {/* EMAIL INPUT */}
      <Input
        type={info.components.input.type.email}
        label={"Correo electrónico"}
        name="email"
        placeholder={"hola@bulletcrossfit.com"}
        validationHandler={(value) => (!value || value == "" ? false : true)}
        setValidData={setValidEmail}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

      {/* CONFIRM EMAIL INPUT */}
      <Input
        type={info.components.input.type.text}
        label={"Confirmar correo electrónico"}
        name="confirm_email"
        placeholder={"hola@bulletcrossfit.com"}
        validationHandler={(value) => (!value || value == "" ? false : true)}
        setValidData={setValidConfirmEmail}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

      {/* PASSWORD INPUT */}
      <Input
        type={info.components.input.type.password}
        label={"Contraseña"}
        name="password"
        placeholder={"Contraseña"}
        validationHandler={(value) => (!value || value == "" ? false : true)}
        setValidData={setValidPassword}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

      {/* CONFIRM PASSWORD INPUT */}
      <Input
        type={info.components.input.type.text}
        label={"Confirmar contraseña"}
        name="confirm_password"
        placeholder={"Confirmar contraseña"}
        validationHandler={(value) => (!value || value == "" ? false : true)}
        setValidData={setValidConfirmPassword}
        submitError={submitError}
        setSubmitError={setSubmitError}
      />

      <input type="month" />

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
          value={props.plan?.name}
        >
          <option value={""}>Selecciona un plan</option>
          {plans &&
            plans.map((plan) => (
              <option key={plan.id} value={plan.name}>
                {plan.name}
              </option>
            ))}
        </select>
      </div>

      {/* GROUP INPUT */}
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
          value={props.schedule?.hour}
        >
          <option value="">Selecciona una clase</option>
          {groups &&
            groups.map((schedule) => (
              <option key={schedule.id} value={schedule.hour}>
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

export { RegisterForm };
