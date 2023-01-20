import ReactDom from "react-dom";
import { useDashboard } from "../../contexts/DashboardContext";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { Button } from "../../components/Public/Button";
import { info } from "../../utils/info";


function FirebaseError() {
  const { setActiveView } = useDashboard();

  return ReactDom.createPortal(
    <div className="FirebaseError">
      <ContentContainer>
        <h1 className="FirebaseError__title">Ocurrió un error inesperado</h1>
        <p className="FirebaseError__description">
          Podría deberse a un fallo en su conexión a Internet. Vuelva a
          conectarse y haga clic en "Intentar de nuevo"
        </p>

        <Button
          type={info.components.button.type.href}
          link={info.routes.home}
          text="Intentar de nuevo"
          onClickHandler={() => setActiveView("Escritorio")}
          fill={true}
          style={info.components.button.classes.error}
          size={"lg"}
        />

      </ContentContainer>
    </div>,
    document.getElementById("error")
  );
}

export { FirebaseError };
