import { Link } from "react-router-dom";
import { useDashboard } from "../../contexts/DashboardContext";

function DropdownElement({ title, path }) {
  const { activeView, setShowNav } = useDashboard();

  return (
    <li
      className={`navdropdown__element ${activeView === title && "active"}`}
      onClick={() => {
        setShowNav(false);
      }}
    >
      <Link to={path}>{title}</Link>
    </li>
  );
}

export { DropdownElement };
