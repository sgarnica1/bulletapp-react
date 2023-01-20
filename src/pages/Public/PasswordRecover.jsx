import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

// COMPONENTS
import { Button } from "../../components/Public/Button";
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";

// UTILS
import { info } from "../../utils/info";

// IMG
import WhiteLogo from "../../assets/img/logo_white_resized.png";
import BlackLogo from "../../assets/img/logo_black_resized.png";
import BackArrow from "../../assets/icon/back-arrow.svg";

function PasswordRecover() {
  const { sendPasswordReset } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {}, [error, success]);

  function submitHandler(event) {
    event.preventDefault();
    const emailRegEx = new RegExp(
      /[\w._]{3,30}@[\w.-]{2,}\.\w{2,5}(\.\w{2,2})?/i
    ); // EMAIL
    const validation = email.match(emailRegEx);
    if (!validation || email === "") {
      setInvalid(true);
    } else {
      setLoading(true);
      sendPasswordReset(email, setSuccess, setError, () => setLoading(false));
    }
  }

  return (
    <div className="PasswordRecover">
      <ContentContainer>
        <header className="PasswordRecover__header">
          <img
            src={theme === info.theme.dark ? WhiteLogo : BlackLogo}
            alt="Bullet CrossFit Logo"
            className="Login__header-logo"
          />
          <h1 className="PasswordRecover__title title">Recuperar contraseña</h1>
          <p className="PasswordRecover__description">
            Escribe tu correo electrónico y te enviaremos un link para recuperar
            tu contraseña
          </p>
        </header>
        <form
          className="PasswordRecover__form"
          onSubmit={(event) => submitHandler(event)}
        >
          <div className={`PasswordRecover__input ${invalid ? "invalid" : ""}`}>
            <div className="PasswordRecover__input-container">
              <input
                type={email}
                placeholder="Correo electrónico"
                onChange={(event) => {
                  setError(false);
                  setEmail(event.target.value);
                  if (invalid) setInvalid(false);
                }}
              />
            </div>
            {invalid && (
              <p className="PasswordRecover__input-error">
                {info.messages.error.invalidEmail}
              </p>
            )}
            {error && (
              <p className="PasswordRecover__input-error">
                Ocurrió un error, intenta de nuevo
              </p>
            )}

            {success && (
              <div className="PasswordRecover__input-success">
                <p>Se envió un correo a <span>{email}.</span> Si no lo encuentras,
                revisa tu bandeja de spam.</p>                
              </div>
            )}
          </div>
          <Button
            type={info.components.button.type.submit}
            size={info.components.button.classes.lg}
            style={info.components.button.classes.primary}
            text={loading ? "Enviando..." : "Enviar"}
            fill={false}
          />
        </form>
        <BackButton link={info.routes.login.path} text="Regresar" mt={true}/>
      </ContentContainer>
    </div>
  );
}

export { PasswordRecover };
