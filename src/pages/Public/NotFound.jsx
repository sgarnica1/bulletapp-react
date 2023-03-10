import { ContentContainer } from "../../components/Layout/ContentContainer";
import { useDashboard } from "../../contexts/DashboardContext";
import { Button } from "../../components/Public/Button";
import { info } from "../../utils/info";

function NotFound() {
  const { setActiveView } = useDashboard();

  return (
    <div className="NotFound">
      <ContentContainer>
        <h1 className="NotFound__title">Recurso no encontrado</h1>
        <p className="NotFound__description">
          Lo sentimos, no pudimos encontrar el recurso que solicitaste.
        </p>

        <Button
          type="link"
          link={"/"}
          text="Regresar al escritorio"
          onClickHandler={() => setActiveView("Escritorio")}
          fill={true}
          style={info.components.button.classes.primary}
          size={"lg"}
        />
      </ContentContainer>
    </div>
  );
}

export { NotFound };
