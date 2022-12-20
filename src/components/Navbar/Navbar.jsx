import { useDashboard } from "../../contexts/DashboardContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Navitem } from "./utils/Navitem";
import { Dropdown } from "./utils/Dropdown";
import { DropdownElement } from "./utils/DropdownElement";
import "./navbar.scss";

function Navbar() {
  const { views, showNav, setShowNav } = useDashboard();
  const { logoutUser } = useAuth();
  const navigation = useNavigate();

  return (
    <aside className={`Navbar ${showNav && "show"}`}>
      <button className="Navbar__close-btn" onClick={() => setShowNav(false)}>
        <span></span>
      </button>
      <nav className="Navbar__container">
        <Link to={"/"} className="Navbar__logo">
          <img
            src="./assets/logo_white_resized.png"
            alt="Logo Bullet CrossFit"
          />
        </Link>
        <div className="Navbar__content">
          <ul className="Navbar__navlist">
            <Navitem title={views.escritorio} path={"/"} />
            <Dropdown>
              <DropdownElement
                title={views.sucursales.juriquilla}
                path={"/sucursal/juriquilla"}
              />
              <DropdownElement
                title={views.sucursales.zibata}
                path={"/sucursal/zibata"}
              />
              <DropdownElement
                title={views.sucursales.grandreserva}
                path={"/sucursal/grand-reserva"}
              />
            </Dropdown>
            <Navitem title={views.pagos} path={"/pagos"} />
            <Navitem title={views.atletas} path={"/atletas"} />
            <Navitem title={views.clases} path={"/clases"} />
            <Navitem title={views.planes} path={"/planes"} />

            <h4 className="Navbar__subtitle">Recursos</h4>
            <Navitem title={views.programacion} path={"/programacion"} />
            <Navitem title={views.videos} path={"/videos"} />

            <h4 className="Navbar__subtitle">Cuenta</h4>
            <Navitem title={views.ajustes} path={"/ajustes"} />
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
