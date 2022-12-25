import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../contexts/DashboardContext";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { info } from "../../utils/info";

// ICONS
import DarkModeIcon from "../../assets/icon/darkmode.svg";
import LightModeIcon from "../../assets/icon/lightmode.svg";
import UserIcon from "../../assets/icon/user.svg";
import WhiteLogo from "../../assets/img/logo_white_resized.png";
import BlackLogo from "../../assets/img/logo_black_resized.png";
import HamburguerBtnIcon from "../../assets/icon/hmbrgrbtn.svg";
import CloseIcon from "../../assets/icon/close.svg";

function Header() {
  const { showNav, setShowNav, currentLocation: location } = useDashboard();
  const { theme } = useTheme();
  const navigation = useNavigate();

  return (
    <header className="Header">
      <nav className="Header__nav">
        {/* HAMBURGER BUTTON */}
        <button
          className="Header__toggler"
          onClick={() => setShowNav((prevState) => !prevState)}
        >
          <img
            src={showNav ? CloseIcon : HamburguerBtnIcon}
            alt={showNav ? "Times icon" : "Hamburguer menu icon"}
          />
        </button>
        {/* LOGO */}
        <img
          className="Header__logo"
          src={theme === info.states.theme.dark ? WhiteLogo : BlackLogo}
          alt="Bullet Logo"
        />
        {/* NAVIGATION */}
        <ul className="Header__nav-container">
          <li className="Header__nav-element current-location">
            <span className="current-location__icon"></span>
            <p className="current-location__text">{location}</p>
          </li>
          <li className="Header__nav-element">
            <div className="Header__user">
              <div className="Header__user-profile">
                <img src={UserIcon} alt="User icon" />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Header };
