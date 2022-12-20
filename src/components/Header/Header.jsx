import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../contexts/DashboardContext";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { info } from "../../utils/info";
// import "./header.scss";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setShowNav, currentLocation: location } = useDashboard();
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigate();

  return (
    <header className="Header">
      <nav className="Header__nav">
        <button
          className="Header__toggler"
          onClick={() => setShowNav((prevState) => !prevState)}
        >
          <span className="Header__toggler-icon"></span>
        </button>
        <ul className="Header__nav-container">
          <li className="Header__nav-element theme">
            <button className="theme__icon-toggler" onClick={toggleTheme}>
              {theme}
            </button>
          </li>
          <li className="Header__nav-element current-location">
            <span className="current-location__icon"></span>
            <p className="current-location__text">{location}</p>
          </li>
          <li className="Header__nav-element">
            <div className="Header__user">
              <div className="Header__user-profile">
                <span>
                  {user.firstName
                    ? user.firstName
                    : user.email[0].toUpperCase()}
                </span>
              </div>
              <div className="Header__user-info Header__dropdown">
                <button
                  className="dropdown__toggle"
                  type="button"
                  onClick={() => setShowDropdown((prevState) => !prevState)}
                >
                  {user.first_name ? user.firstName : ""}
                  <span className="dropdown__toggle-icon"></span>
                </button>
                <ul className={`dropdown__content ${showDropdown && "show"}`}>
                  <li>
                    <a className="dropdown__item" href="/">
                      Ajustes
                    </a>
                  </li>
                  <li
                    onClick={() => logoutUser(() => navigation("/login"))}
                    style={{ cursor: "pointer" }}
                  >
                    Salir
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Header };
