import { useDashboard } from "../../contexts/DashboardContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import { Dropdown } from "./Dropdown";
import { DropdownElement } from "./DropdownElement";
import { Navitem } from "./Navitem";

// UTILS
import { navMenu, type } from "../../utils/navMenu";
import { info } from "../../utils/info";

function Navbar({ user }) {
  const { showNav, setShowNav } = useDashboard();
  const { logoutUser } = useAuth();
  const navigation = useNavigate();

  return (
    <aside className={`Navbar ${showNav && "show"}`}>
      {/* HAMBURGUER BUTTON */}
      <button className="Navbar__close-btn" onClick={() => setShowNav(false)}>
        <span></span>
      </button>
      {/* NAVIGATION */}
      <nav className="Navbar__container">
        <div className="Navbar__content">
          <ul className="Navbar__navlist">
            {user.data?.role &&
              navMenu[user.data.role].map((menu, mainIndex) => {
                // MAIN MENU
                if (menu.type === type.mainMenu && menu.active)
                  return menu.elements.map((el) => {
                    // ITEM
                    if (el.type === type.item && el.active)
                      return (
                        <Navitem
                          key={el.name}
                          title={el.name}
                          path={el.route}
                        />
                      );
                    // DROPDOWN
                    if (el.type === type.dropdown && el.active)
                      return (
                        <Dropdown title={el.name} key={el.name}>
                          {el.elements.map((dropEl) => {
                            if (dropEl.active)
                              return (
                                <DropdownElement
                                  key={dropEl.name}
                                  title={dropEl.name}
                                  path={dropEl.route}
                                />
                              );
                          })}
                        </Dropdown>
                      );
                  });
                // SUBMENUS
                if (menu.type === type.subMenu && menu.active)
                  return (
                    <div key={mainIndex}>
                      {/* SUBTITLE */}
                      <h4 key={Math.random()} className="Navbar__subtitle">
                        {menu.subtitle}
                      </h4>
                      {menu.elements.map((el) => {
                        // LOGOUT
                        if (el.type === type.logout)
                          return (
                            <li
                              key={el.name}
                              className="Navbar__navlink"
                              onClick={() =>
                                logoutUser(() => {
                                  navigation("/login");
                                  setShowNav(false);
                                })
                              }
                            >
                              Salir
                            </li>
                          );

                        // ITEM
                        if (el.type === type.item && el.active)
                          return (
                            <Navitem
                              key={el.name}
                              title={el.name}
                              path={el.route}
                            />
                          );

                        // DROPDOWN
                        if (el.type === type.dropdown && el.active)
                          return (
                            <Dropdown title={el.name} key={el.name}>
                              {el.elements.map((dropEl) => {
                                if (dropEl.active)
                                  return (
                                    <DropdownElement
                                      key={dropEl.name}
                                      title={dropEl.name}
                                      path={dropEl.route}
                                    />
                                  );
                              })}
                            </Dropdown>
                          );
                      })}
                    </div>
                  );
              })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export { Navbar };
