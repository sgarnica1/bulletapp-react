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
  const [searchValue, setSearchValue] = useState("");
  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [showNav, setShowNav] = useState(false);

  function searchDataFromInput(data) {
    let filteredData = [];

    if (!searchValue.length > 0) {
      filteredData = data;
    } else {
      filteredData = data.filter((element) => {
        const dataText = `${element.first_name.toLowerCase()} ${element.last_name.toLowerCase()}`;
        const searchValueText = searchValue.toLowerCase().trim();

        return dataText.includes(searchValueText);
      });
    }

    return filteredData;
  }

  return (
    <DashboardContext.Provider
      value={{
        activeView,
        currentLocation,
        searchValue,
        showAddFormModal,
        showNav,
        setActiveView,
        setCurrentLocation,
        setSearchValue,
        setShowAddFormModal,
        setShowNav,
        searchDataFromInput,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export { useDashboard, DashboardProvider };
