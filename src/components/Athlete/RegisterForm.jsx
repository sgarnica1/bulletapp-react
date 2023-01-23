import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// COMPONENTS
import { Button } from "../../components/Public/Button";
import { Input } from "../../components/Public/Input";
import { Select } from "../../components/Public/Select";

// INFO
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

function RegisterForm() {
  const { registerUser, error, setError } = useAuth();

  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [validBirthDay, setValidBirthDay] = useState(false);

  const [invalidPasswordFormat, setInvalidPasswordFormat] = useState(false);
  const [invalidMatchingPassword, setInvalidMatchingPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  function handleSubmitData(event) {
    event.preventDefault();
    setSuccess(false);

    // Input values
    let firstName = event.target.first_name.value;
    let lastName = event.target.last_name.value;
    let email = event.target.email.value;
    let group = event.target.group.value;
    let plan = event.target.plan.value;
    let password = event.target.password.value;
    let birthDay = event.target.birthday.value;

    // Firebase dockeys
    const firtsNameKey = info.firebase.docKeys.users.firstName;
    const lastNameKey = info.firebase.docKeys.users.lastName;
    const emailKey = info.firebase.docKeys.users.email;
    const planKey = info.firebase.docKeys.users.plan;
    const groupKey = info.firebase.docKeys.users.group;
    const birthDayKey = info.firebase.docKeys.users.birthDay;
    const birthMonthKey = info.firebase.docKeys.users.birthMonth;

    // Validate input values
    if (!validFirstName) return setSubmitError(true);
    if (!validLastName) return setSubmitError(true);
    if (!validEmail) return setSubmitError(true);
    if (!validPassword) {
      setInvalidPasswordFormat(true);
      setSubmitError(true);
      return;
    }
    if (!validConfirmPassword) {
      setInvalidMatchingPassword(true);
      setSubmitError(true);
      return;
    }
    if (!validBirthDay) return setSubmitError(true);
    if (plan === "") return setSubmitError(true);
    if (group === "") return setSubmitError(true);

    setSubmitLoading(true);

    const newUser = {
      [firtsNameKey]: firstName,
      [lastNameKey]: lastName,
      [emailKey]: email,
      [groupKey]: group,
      [planKey]: plan,
      [birthDayKey]: utils.parseDate(birthDay).getDate(),
      [birthMonthKey]: utils.parseDate(birthDay).getMonth() + 1,
      displayName: firstName + " " + lastName,
      password: password,
    };

    registerUser(event, newUser, setSuccess, (error) => {
      setSubmitLoading(false);
      if (!error) {
        event.target.first_name.value = "";
        event.target.last_name.value = "";
        event.target.email.value = "";
        event.target.group.value = "";
        event.target.plan.value = "";
        event.target.password.value = "";
        event.target.confirm_password.value = "";
        event.target.birthday.value = "";
      }
    });
  }

  // RENDER
  if (success)
    return (
      <div className="RegisterForm__success">
        <p className="RegisterForm__input-success">
          {info.messages.success.userCreated}
        </p>
        ;
        <Link
          to={info.routes.login.path}
          onClick={() => setError(false)}
          className="Register__back-btn"
        >
          Iniciar sesión
        </Link>
      </div>
    );

  return (
    <form
      className="RegisterForm__form"
      autoComplete="off"
      onSubmit={(event) => handleSubmitData(event)}
    >
      <div className="RegisterForm__input-grid">
        {/* NAME INPUT */}
        <Input
          type={info.components.input.type.text}
          label={"Nombre (s)"}
          name="first_name"
          placeholder={"Nombre (s)"}
          validationHandler={(value) => (!value || value === "" ? false : true)}
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
          validationHandler={(value) => (!value || value === "" ? false : true)}
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
          validationHandler={(value) => {
            const emailRegEx = new RegExp(
              /[\w._]{3,30}@[\w.-]{2,}\.\w{2,5}(\.\w{2,2})?/i
            );
            const validation = value.match(emailRegEx);
            return validation ? true : false;
          }}
          setValidData={setValidEmail}
          submitError={submitError}
          setSubmitError={setSubmitError}
        />

        <Input
          type={info.components.input.type.date}
          label={"Cumpleaños"}
          name="birthday"
          placeholder={"Cumpleaños"}
          validationHandler={(value) => (!value || value === "" ? false : true)}
          setValidData={setValidBirthDay}
          submitError={submitError}
          setSubmitError={setSubmitError}
        />

        {/* PASSWORD INPUT */}
        <div>
          <Input
            type={info.components.input.type.password}
            allowShowPassword={true}
            label={"Contraseña"}
            name="password"
            id="password"
            placeholder={"Contraseña"}
            validationHandler={(value) => {
              const regex = new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/#@$!%*?&\(\)])[a-zA-Z\d/#@$!%*?&\(\)]{8,}$/i
              );
              const validation = value.match(regex);
              if (!validation) setInvalidPasswordFormat(true);
              return validation ? true : false;
            }}
            onChangeCallback={(value) => {
              setInvalidPasswordFormat(false);
              return value;
            }}
            setValidData={setValidPassword}
            submitError={submitError}
            setSubmitError={setSubmitError}
          />

          {invalidPasswordFormat && (
            <p className="ChangePassword__input-error">
              {info.messages.error.invalidPassword}
            </p>
          )}
        </div>

        <div>
          {/* CONFIRM PASSWORD INPUT */}
          <Input
            type={info.components.input.type.password}
            allowShowPassword={false}
            label={"Confirmar contraseña"}
            name="confirm_password"
            placeholder={"Confirmar contraseña"}
            validationHandler={(value) => {
              const password = document.querySelector("#password").value;
              value !== password && setInvalidMatchingPassword(true);
              return value === password ? true : false;
            }}
            onChangeCallback={(value) => {
              setInvalidMatchingPassword(false);
              return value;
            }}
            setValidData={setValidConfirmPassword}
            submitError={submitError}
            setSubmitError={setSubmitError}
          />

          {invalidMatchingPassword && (
            <p className="ChangePassword__input-error">
              {info.messages.error.invalidMatchingPassword}
            </p>
          )}
        </div>

        <Select
          label="Horario de clase"
          options={[
            "6:00am",
            "7:30am",
            "8:30am",
            "5:30pm",
            "6:30pm",
            "7:30pm",
            "8:30pm",
          ]}
          name="group"
          submitError={submitError}
        />

        <Select
          label="Plan inscrito"
          options={["5D", "3D", "Kids", "Pareja"]}
          name="plan"
          submitError={submitError}
        />
      </div>

      <div className="RegisterForm__btn-container">
        {/* SUBMIT BUTTON */}

        {error && <p className="RegisterForm__input-error">{error}</p>}
        <Button
          type={info.components.button.type.submit}
          text={submitLoading ? "Enviando..." : "Registrarse"}
          size={info.components.button.classes.lg}
          style={info.components.button.classes.primary}
          fill={true}
        />
        <Link
          to={info.routes.login.path}
          onClick={() => setError(false)}
          className="Register__back-btn"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </form>
  );
}

export { RegisterForm };
