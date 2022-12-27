import { useDashboard } from "../../contexts/DashboardContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Navitem } from "./Navitem";
import { Dropdown } from "./Dropdown";
import { DropdownElement } from "./DropdownElement";
import { info } from "../../utils/info";

function Navbar() {
  const { showNav, setShowNav } = useDashboard();
  const { logoutUser } = useAuth();
  const navigation = useNavigate();

  return (
    <aside className={`Navbar ${showNav && "show"}`}>
      <button className="Navbar__close-btn" onClick={() => setShowNav(false)}>
        <span></span>
      </button>
      <nav className="Navbar__container">
        <div className="Navbar__content">
          <ul className="Navbar__navlist">
            <Navitem title={info.views.dashboard} path={info.routes.home} />
            <Dropdown>
              <DropdownElement
                title={info.views.locations.juriquilla}
                path={info.routes.locations.juriquilla}
              />
              <DropdownElement
                title={info.views.locations.zibata}
                path={info.routes.locations.zibata}
              />
              <DropdownElement
                title={info.views.locations.grandreserva}
                path={info.routes.locations.grandreserva}
              />
            </Dropdown>
            <Navitem title={info.views.payments} path={info.routes.payments} />
            <Navitem title={info.views.athletes} path={info.routes.athletes} />
            <Navitem title={info.views.groups} path={info.routes.groups} />
            <Navitem title={info.views.plans} path={info.routes.plans} />

            <h4 className="Navbar__subtitle">Recursos</h4>
            <Navitem
              title={info.views.progrgamming}
              path={info.routes.programming}
            />
            <Navitem title={info.views.videos} path={info.routes.videos} />

            <h4 className="Navbar__subtitle">Cuenta</h4>
            <Navitem title={info.views.settings} path={info.routes.settings} />
            <li
              className="Navbar__navitem"
              onClick={() =>
                logoutUser(() => {
                  navigation("/login");
                  setShowNav(false);
                })
              }
            >
              Salir
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export { Navbar };
