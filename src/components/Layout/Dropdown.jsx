import { useState, useEffect } from "react";
import { useDashboard } from "../../contexts/DashboardContext";

function Dropdown({ children, title }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeWithin, setActiveWithin] = useState(false);
  const { activeView } = useDashboard();

  useEffect(() => {
    setActiveWithin(false);
    children.forEach((element) =>
      element.props.title === activeView ? setActiveWithin(true) : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView]);

  return (
    <li
      className={`Navbar__navitem Navbar__navdropdown  ${
        activeWithin && "active"
      }`}
      onClick={() => setShowDropdown((prevState) => !prevState)}
    >
      <button
        href="#"
        className={`Navbar__navlink navdropdown__button ${
          showDropdown && "show"
        }`}
      >
        <p>{title}</p>
        <span></span>
      </button>
      <ul className={`navdropdown__container ${showDropdown && "show"}`}>
        {children}
      </ul>
    </li>
  );
}

export { Dropdown };
