import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

// COMPONENTES
import { Button } from "../../components/Public/Button";
import { InputContainer } from "../../components/Public/InputContainer";

// UTILS
import { info } from "../../utils/info";

// IMG
import WhiteLogo from "../../assets/img/logo_white_resized.png";
import BlackLogo from "../../assets/img/logo_black_resized.png";

function Login() {
  const [passInputType, setPassInputType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser, error, setError, loggingIn } = useAuth();
  const { theme } = useTheme();

  const submitHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");

    const email = event.target.username.value;
    const password = event.target.password.value;

    if (!email || !password)
      return setErrorMessage(info.messages.error.allMissingData);

    const emailRegEx = new RegExp(
      /[\w._]{3,30}@[\w.-]{2,}\.\w{2,5}(\.\w{2,2})?/i
    ); // EMAIL

    if (!email.match(emailRegEx))
      return setErrorMessage(info.messages.error.invalidEmail);

    return loginUser(event);
  };

  return (
    <div className="Login">
      <main className="Login__main">
        <header className="Login__header">
          <img
            src={theme === info.theme.dark ? WhiteLogo : BlackLogo}
            alt="Bullet CrossFit Logo"
            className="Login__header-logo"
          />
        </header>
        <form
          className="Login__form"
          onSubmit={(event) => submitHandler(event)}
          onChange={() => {
            setError(null);
          }}
        >
          <h1 className="Login__welcome">Bienvenido</h1>
          <div className="Login__input-container">
            <InputContainer
              type={"text"}
              name={"username"}
              placeholder={"Correo electrónico"}
              error={error}
            />
            <InputContainer
              type={passInputType}
              name={"password"}
              placeholder={"Contraseña"}
              error={error}
            >
              <span
                className={`password-toggle ${
                  passInputType === "text" && "visible"
                }`}
                onClick={() => {
                  setPassInputType((prevState) =>
                    prevState === "password" ? "text" : "password"
                  );
                }}
              ></span>
            </InputContainer>
            {errorMessage ? (
              <div className="Login__error">{errorMessage}</div>
            ) : null}
            {error ? <div className="Login__error">{error}</div> : null}
          </div>
          <div className="Login__button-container">
            <Button
              type={info.components.button.type.submit}
              size={info.components.button.classes.lg}
              style={info.components.button.classes.primary}
              text={!loggingIn ? "Ingresar" : "Iniciando sesión..."}
              fill={true}
            />
          </div>
          <div className="Login__helper-btns">
            <Link
              to={info.routes.passwordRecover.path}
              className="Login__passrecover-btn"
            >
              Recuperar contraseña
            </Link>
            <Link
              to={info.routes.register.path}
              className="Login__register-btn"
            >
              Registrarse
            </Link>
          </div>
        </form>
      </main>
      <section className="Login__background-img"></section>
    </div>
  );
}

export { Login };
