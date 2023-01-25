import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";

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
  const { user, loginUser, changePassword, error } = useAuth();
  const { setErrorMessage, setSuccessMessage, errorMessage } = useDashboard();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [visibleCurrentPassword, setVisibleCurrentPassword] = useState(false);
  const [invalidCurrentPassword, setInvalidCurrentPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [matchingPassword, setMatchingPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidMatchingPassword, setInvalidMatchingPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  function submitHandler(event) {
    event.preventDefault();
    if (!matchingPassword || password !== matchingPassword || invalidPassword)
      return setInvalidMatchingPassword(true);

    setLoading(true);
    loginUser(
      null,
      { email: user.email, password: currentPassword },
      setErrorMessage
    );

    if (!error && !errorMessage) {
      console.log("update password");
      changePassword(
        password,
        setSuccessMessage,
        setErrorMessage,
        setLoading,
        () => {
          navigate(info.routes.home);
        }
      );
    }
  }

  useEffect(() => {}, [password, matchingPassword]);

  return (
    <div className="ChangePassword">
      <ContentContainer>
        <BackButton link={info.routes.settings.path} mb={true} />
        <h2 className="app-title">Cambiar contraseña</h2>
        <form
          className="ChangePassword__form"
          onSubmit={(event) => submitHandler(event)}
        >
          <div className={`ChangePassword__input`}>
            {/* CURRENT PASSWORD */}
            <span className="app-meta-tag">Contraseña actual</span>
            <div className="ChangePassword__input-container">
              <input
                type={visibleCurrentPassword ? "text" : "password"}
                placeholder="Contraseña actual"
                value={currentPassword}
                onChange={(event) => {
                  setCurrentPassword(event.target.value);
                }}
              />
              <img
                src={visibleCurrentPassword ? VisibleIcon : InvisibleIcon}
                alt={visibleCurrentPassword ? "Eye icon" : "Closed eye icon"}
                onClick={() =>
                  setVisibleCurrentPassword(!visibleCurrentPassword)
                }
              />
            </div>
            {/* {invalidPassword && (
              <p className="ChangePassword__input-error">
                {info.messages.error.invalidPassword}
              </p>
            )} */}
          </div>

          <div
            className={`ChangePassword__input ${
              invalidPassword ? "invalid" : ""
            }`}
          >
            {/* NEW PASSWORD */}
            <span className="app-meta-tag">Nueva contraseña</span>
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
            <span className="app-meta-tag">Confirmar contraseña</span>
            <div className="ChangePassword__input-container">
              <input
                type="password"
                placeholder="Confirma la contraseña"
                value={matchingPassword}
                onChange={(event) => {
                  passwordVerifier();
                  setMatchingPassword(event.target.value);
                  setInvalidMatchingPassword(false);
                }}
                onBlur={(event) => {
                  passwordVerifier();
                  setInvalidMatchingPassword(
                    !matchingPassword || password !== matchingPassword
                  );
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
            disabled={
              !matchingPassword ||
              password !== matchingPassword ||
              invalidPassword
            }
          />
        </form>
      </ContentContainer>
    </div>
  );

  function passwordVerifier() {
    const regex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@/!"#$%&/()=?¡'¿*-_])[a-zA-Z\d@/!"#$%&/()=?¡'¿*-_]{8,}$/i
    );
    const validation = password.match(regex);
    setInvalidPassword(validation == null ? true : false);
  }
}

export { ChangePassword };
