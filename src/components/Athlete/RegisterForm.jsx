import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

// COMPONENTS
import { Button } from "../../components/Public/Button";
import { Input } from "../../components/Public/Input";

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
    let password = event.target.password.value;
    let birthDay = event.target.birthday.value;

    // Firebase dockeys
    const firtsNameKey = info.firebase.docKeys.users.firstName;
    const lastNameKey = info.firebase.docKeys.users.lastName;
    const emailKey = info.firebase.docKeys.users.email;
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

    setSubmitLoading(true);

    const newUser = {
      [firtsNameKey]: firstName,
      [lastNameKey]: lastName,
      [emailKey]: email,
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
        event.target.password.value = "";
        event.target.confirm_password.value = "";
        event.target.birthday.value = "";
      }
    });
  }

  // RENDER
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
          validationHandler={(value) => (!value || value == "" ? false : true)}
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
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/#@$!%*?&])[a-zA-Z\d/#@$!%*?&]{8,}$/i
              );
              const validation = value.match(regex);
              if (!validation) setInvalidPasswordFormat(true);
              return validation ? true : false;
            }}
            onChangeCallback={() => setInvalidPasswordFormat(false)}
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
            onChangeCallback={() => setInvalidMatchingPassword(false)}
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
      </div>

      <div className="RegisterForm__submit-btn">
        {/* SUBMIT BUTTON */}
        <Button
          type={info.components.button.type.submit}
          text={submitLoading ? "Enviando..." : "Registrarse"}
          size={info.components.button.classes.lg}
          style={info.components.button.classes.primary}
          fill={true}
        />
      </div>
      {success && <p className="PasswordRecover__input-success">{success}</p>}
      {error && <p className="ChangePassword__input-error">{error}</p>}
    </form>
  );
}

export { RegisterForm };
