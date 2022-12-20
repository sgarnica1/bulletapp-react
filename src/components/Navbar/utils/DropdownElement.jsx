import { Link } from "react-router-dom";
import { useDashboard } from "../../../contexts/DashboardContext";

function DropdownElement({ title, path }) {
  const { currentLocation, setCurrentLocation, setShowNav } = useDashboard();

  return (
    <li
      className={`navdropdown__element ${
        currentLocation === title && "active"
      }`}
      onClick={() => {
        setCurrentLocation(title);
        setShowNav(false);
      }}
    >
      <Link to={path}>{title}</Link>
    </li>
  );
}

export { DropdownElement };
