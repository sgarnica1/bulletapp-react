import { useState, useContext, createContext } from "react";
import { info } from "../utils/info";

const DashboardContext = createContext();

function useDashboard() {
  return useContext(DashboardContext);
}

function DashboardProvider({ children }) {
  // SET INITIAL VIEW BASED ON CURRENT PATH
  const path = window.location.pathname;
  let initialView = info.views.home;
  for (const route in info.routes)
    if (info.routes[route] === path) initialView = info.views[route];
  // --

  // INITIAL STATES
  const [activeView, setActiveView] = useState(initialView);
  const [currentLocation, setCurrentLocation] = useState("Juriquilla");
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  return (
    <DashboardContext.Provider
      value={{
        activeView,
        currentLocation,
        showAddFormModal,
        showNav,
        errorMessage,
        successMessage,
        setActiveView,
        setCurrentLocation,
        setShowAddFormModal,
        setShowNav,
        setErrorMessage,
        setSuccessMessage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export { useDashboard, DashboardProvider };
