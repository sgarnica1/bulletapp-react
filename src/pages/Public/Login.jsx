import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { InputContainer } from "../../components/Public/InputContainer";
import { Button } from "../../components/Public/Button";
import { info } from "../../utils/info";

// IMG
import WhiteLogo from "../../assets/img/logo_white_resized.png";
import BlackLogo from "../../assets/img/logo_black_resized.png";

function Login() {
  const [passInputType, setPassInputType] = useState("password");
  const { loginUser, error, setError, loggingIn } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="Login">
      <main className="Login__main">
        <header className="Login__header">
          <img
            src={theme === info.states.theme.dark ? WhiteLogo : BlackLogo}
            alt="Bullet CrossFit Logo"
            className="Login__header-logo"
          />
        </header>
        <form
          className="Login__form"
          onSubmit={(event) => {
            loginUser(event);
          }}
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
            <a href="/" className="Login__passrecover-btn">
              Recuperar contraseña
            </a>
          </div>
        </form>
        <a href="/" className="Login__privacy">
          Aviso de privacidad
        </a>
      </main>
      <section className="Login__background-img"></section>
    </div>
  );
}

export { Login };
