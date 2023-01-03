import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";
import { useAthletes } from "../../hooks/useAthletes";

// Components
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { AthletesList } from "../../components/Admin/AthletesList";
import { AthleteRow } from "../../components/Admin/AthleteRow";
import { ErrorBanner } from "../../components/Public/ErrorBanner";
import { Banner } from "../../components/Public/Banner";
import { SearchBar } from "../../components/Public/SearchBar";

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
      <ContentContainer>
        <Banner
          title={"Atletas"}
          description={
            "Visualiza, modifica o agrega nuevos atletas en esta sección"
          }
        />
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
