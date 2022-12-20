import { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";
import { useAthletes } from "../../hooks/useAthletes";

// Components
import { ContentContainer } from "../../components/ContentContainer/ContentContainer";
import { AthletesList } from "../../components/AthletesList/AthletesList";
import { AthleteRow } from "../../components/AthletesList/AthleteRow";
import { ErrorBanner } from "../../components/ErrorBanner/ErrorBanner";
import { Banner } from "../../components/Banner/Banner";
import { SearchBar } from "./components/SearchBar/SearchBar";
import "./athletes.scss";

function Athletes() {
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(false);
  const { athletes, loading, error, actions } = useAthletes();
  const { searchValue, setSearchValue, searchDataFromInput, setShowNav } =
    useDashboard();
  const data = searchDataFromInput(athletes);

  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    actions.getAthletes();
  }, [refetch]);

  return (
    <div className="Athletes">
      <Banner
        title={"Atletas"}
        description={
          "Visualiza, modifica o agrega nuevos atletas en esta sección"
        }
      />
      <ContentContainer>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          loading={loading}
        />

        <AthletesList
          title={"Inscripciones recientes"}
          route={"/atletas"}
          header={"Clase"}
          error={error}
          loading={loading}
          data={data}
          // Render functions
          onError={() => (
            <ErrorBanner
              description={
                "Ocurrió un error al cargar la información de los atletas"
              }
            />
          )}
          render={(athlete) => (
            <AthleteRow
              key={athlete.id}
              id={athlete.id}
              name={`${athlete.first_name} ${athlete.last_name}`}
              date={athlete.created}
              plan={athlete.plan}
              params={athlete.schedule}
              onRefetch={onRefetch}
            />
          )}
        ></AthletesList>
        <button
          className="Athletes__add-btn"
          onClick={() => {
            navigate("nuevo");
            setShowNav(false);
          }}
        >
          +
        </button>
      </ContentContainer>
    </div>
  );
}

export { Athletes };
