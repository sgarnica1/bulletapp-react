import "./notfound.scss";
import { Link } from "react-router-dom";
import { ContentContainer } from "../../components/ContentContainer/ContentContainer";
import { useDashboard } from "../../contexts/DashboardContext";

function NotFound() {
  const { setActiveView } = useDashboard();

  return (
    <div className="NotFound">
      <ContentContainer>
        <h1 className="NotFound__title">Recurso no encontrado</h1>
        <p className="NotFound__description">Lo sentimos, no pudimos encontrar el recurso que solicitaste.</p>
        <Link to="/" onClick={() => setActiveView("Escritorio")} className="NotFound__return-btn">
          Regresar al escritorio
        </Link>
      </ContentContainer>
    </div>
  );
}

export { NotFound };
