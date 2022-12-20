import { useState, useContext, createContext } from "react";

const DashboardContext = createContext();

function useDashboard() {
  return useContext(DashboardContext);
}

function DashboardProvider({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Juriquilla");
  const [activeView, setActiveView] = useState("Escritorio");
  const [searchValue, setSearchValue] = useState("");

  const views = {
    escritorio: "Escritorio",
    pagos: "Pagos",
    atletas: "Atletas",
    clases: "Clases",
    planes: "Planes",
    programacion: "Programación",
    videos: "Videos",
    ajustes: "Ajustes",
    sucursales: {
      juriquilla: "Juriquilla",
      zibata: "Zibatá",
      grandreserva: "Grand Reserva",
    },
  };

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
        views,
        showNav,
        currentLocation,
        activeView,
        searchValue,
        setShowNav,
        setActiveView,
        setCurrentLocation,
        setSearchValue,
        searchDataFromInput,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export { useDashboard, DashboardProvider };
