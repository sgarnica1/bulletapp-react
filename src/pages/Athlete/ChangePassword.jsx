import { useState, useEffect } from "react";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { Button } from "../../components/Public/Button";
import { ContentContainer } from "../../components/Layout/ContentContainer";

// UTILS
import { info } from "../../utils/info";

// IMG
import InvisibleIcon from "../../assets/icon/invisible.svg";
import VisibleIcon from "../../assets/icon/visible.svg";

function ChangePassword() {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [matchingPassword, setMatchingPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidMatchingPassword, setInvalidMatchingPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const passwordVerifier = () => {
    const regex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&])[a-zA-Z\d@!%*?&]{8,}$/i
    );
    const validation = password.match(regex);
    setInvalidPassword(validation == null ? true : false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!matchingPassword || password !== matchingPassword || invalidPassword)
      return setInvalidMatchingPassword(true);

    setLoading(true);
    console.log("Cambiando contraseña...");
  };

  useEffect(() => {}, [password, matchingPassword]);

  return (
    <div className="ChangePassword">
      <ContentContainer>
        <BackButton link={info.routes.settings.path} mb={true} />
        <h2 className="title">Cambiar contraseña</h2>
        <form
          className="ChangePassword__form"
          onSubmit={(event) => submitHandler(event)}
        >
          <div
            className={`ChangePassword__input ${
              invalidPassword ? "invalid" : ""
            }`}
          >
            <div className="ChangePassword__input-container">
              <input
                type={visible ? "text" : "password"}
                placeholder="Nueva contraseña"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setInvalidPassword(false);
                }}
              />
              <img
                src={visible ? VisibleIcon : InvisibleIcon}
                alt={visible ? "Eye icon" : "Closed eye icon"}
                onClick={() => setVisible(!visible)}
              />
            </div>
            {invalidPassword && (
              <p className="ChangePassword__input-error">
                {info.messages.error.invalidPassword}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div
            className={`ChangePassword__input ${
              invalidMatchingPassword ? "invalid" : ""
            }`}
          >
            <div className="ChangePassword__input-container">
              <input
                type={visible ? "text" : "password"}
                placeholder="Confirma la contraseña"
                value={matchingPassword}
                onChange={(event) => {
                  passwordVerifier();
                  setMatchingPassword(event.target.value);
                  setInvalidMatchingPassword(false);
                }}
              />
            </div>
            {invalidMatchingPassword && (
              <p className="ChangePassword__input-error">
                {info.messages.error.invalidMatchingPassword}
              </p>
            )}
          </div>
          <Button
            type={info.components.button.type.submit}
            text={loading ? "Actualizando..." : "Actualizar"}
            size={info.components.button.classes.lg}
            style={info.components.button.classes.primary}
            fill={true}
          />
        </form>
      </ContentContainer>
    </div>
  );
}

export { ChangePassword };
