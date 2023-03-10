import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../contexts/DashboardContext";
import { useTheme } from "../../contexts/ThemeContext";
import { info } from "../../utils/info";

// ICONS
import WhiteLogo from "../../assets/img/logo_white_resized.png";
import BlackLogo from "../../assets/img/logo_black_resized.png";
import HamburguerBtnIcon from "../../assets/icon/hmbrgrbtn.svg";
import CloseIcon from "../../assets/icon/close.svg";

function Header({ user }) {
  const { showNav, setShowNav } = useDashboard();
  const { theme } = useTheme();
  const navigation = useNavigate();

  useEffect(() => {
    showNav
      ? document.body.classList.add("noscroll")
      : document.body.classList.remove("noscroll");
  }, [showNav]);

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
          src={theme === info.theme.dark ? WhiteLogo : BlackLogo}
          alt="Bullet Logo"
        />
        {/* NAVIGATION */}
        <ul className="Header__nav-container">
          <li className="Header__nav-element">
            <div className="Header__user">
              <span
                className="Header__user-profile"
                onClick={() => {
                  navigation(info.routes.settings.path);
                }}
              >
                {user?.data?.first_name[0]}
              </span>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Header };
