import { Link } from "react-router-dom";
import { useDashboard } from "../../../contexts/DashboardContext";

function Navitem({ title, path }) {
  const { activeView, setActiveView, setShowNav } = useDashboard();

  return (
    <li
      className={`Navbar__navitem ${activeView === title && "active"}`}
      onClick={() => {
        setActiveView(title)
        setShowNav(false)
      }}
    >
      <Link to={path} className="Navbar__navlink">
        {title}
      </Link>
    </li>
  );
}

export { Navitem };
