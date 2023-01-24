import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUser";
import { utils } from "../../utils/utils";

const UserCard = ({ user, reload }) => {
  const [updateUser, setUpdateUser] = useState(false);
  const [activeState, setActiveState] = useState(user.active);
  const { actions, users } = useUsers();

  useEffect(() => {
    console.log(user.displayName);
    setActiveState(user.active)

    if (updateUser) {
      if (user.active) {
        setUpdateUser(false);
        return actions.deactivateUser(user.id);
      }

      setUpdateUser(false);
      return actions.activateUser(user.id);
    }

    if (users) {
      setActiveState(!activeState);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUser, users, reload]);

  return (
    <div className={`UserCard`}>
      <div className="UserCard__content">
        <div className="UserCard__info">
          <div className="UserCard__meta-container">
            <span className="app-meta-tag">Fecha de registro</span>
            <p className="UserCard__meta-value">
              {utils.formatDate(new Date(user.created_at.seconds * 1000))}
            </p>
          </div>
          <div className="UserCard__meta-container">
            <span className="app-meta-tag">Nombre</span>
            <p className="UserCard__meta-value">{user.displayName}</p>
          </div>
          <div className="UserCard__meta-container">
            <span className="app-meta-tag">Email</span>
            <p className="UserCard__meta-value">{user.email}</p>
          </div>
          <div className="UserCard__meta-container">
            <span className="app-meta-tag">Horario</span>
            <p className="UserCard__meta-value">{user.group}</p>
          </div>
          <div className="UserCard__meta-container">
            <span className="app-meta-tag">Plan</span>
            <p className="UserCard__meta-value">{user.plan}</p>
          </div>
        </div>
        <button
          type="button"
          className={`UserCard__category ${
            activeState ? "active" : "inactive"
          }`}
          onClick={() => setUpdateUser(true)}
        >
          {activeState ? "Activo" : "Inactivo"}
        </button>
      </div>
    </div>
  );
};

export { UserCard };
