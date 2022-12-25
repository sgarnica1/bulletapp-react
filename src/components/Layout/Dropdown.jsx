import { useState } from "react";

function Dropdown({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <li
      className="Navbar__navitem Navbar__navdropdown"
      onClick={() => setShowDropdown((prevState) => !prevState)}
    >
      <button
        href="#"
        className={`Navbar__navlink navdropdown__button ${
          showDropdown && "show"
        }`}
      >
        <p>Sucursales</p>
        <span></span>
      </button>
      <ul className={`navdropdown__container ${showDropdown && "show"}`}>
        {children}
      </ul>
    </li>
  );
}

export { Dropdown };
