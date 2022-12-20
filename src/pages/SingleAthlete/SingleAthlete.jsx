import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAthletes } from "../../hooks/useAthletes";
import { ContentContainer } from "../../components/ContentContainer/ContentContainer";
import { EditAthleteForm } from "../../components/AthleteForm/EditAthleteForm";
import { Banner } from "../../components/Banner/Banner";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { ErrorBanner } from "../../components/ErrorBanner/ErrorBanner";
import "./single-athlete.scss";

function SingleAthlete() {
  const { athletes: athlete, loading, error, actions } = useAthletes();
  const [refetch, setRefetch] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    actions.getAthleteById(id);
  }, [refetch]);

  return (
    <div className="SingleAthlete">
      <Banner
        title={"Editar Atleta"}
        description={"Edita la información de Sergio"}
      />
      <ContentContainer>
        {error && <ErrorBanner />}
        {loading && !error && <LoadingIcon />}
        {!loading && !error && (
          <>
            <EditAthleteForm
              first_name={athlete?.first_name}
              last_name={athlete?.last_name}
              email={athlete?.email}
              phone_number={athlete?.phone_number}
              plan={athlete?.plan}
              schedule={athlete?.schedule}
              beneficiary={athlete?.beneficiary}
              id={id}
              onRefetch={onRefetch}
            />
            <div className="SingleAthlete__delete">
              <p className="SingleAthlete__delete-title">Eliminar Atleta</p>
              <button
                className="SingleAthlete__delete-btn"
                onClick={() => {
                  actions.deleteAthlete(id, () => navigate("/atletas"));
                }}
              >
                Elimiar
              </button>
            </div>
          </>
        )}
      </ContentContainer>
    </div>
  );
}

export { SingleAthlete };
