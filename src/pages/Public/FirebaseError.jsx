import ReactDom from "react-dom";
import { useDashboard } from "../../contexts/DashboardContext";
import { useTheme } from "../../contexts/ThemeContext";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { Button } from "../../components/Public/Button";
import { info } from "../../utils/info";
import LogoWhite from "../../assets/img/logo_white_resized.png";
import LogoBlack from "../../assets/img/logo_black_resized.png";

function FirebaseError() {
  const { setActiveView } = useDashboard();
  const { theme } = useTheme();

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
          style={"error"}
          size={"lg"}
        />
        {/* <img
          src={theme === info.theme.dark ? LogoWhite : LogoBlack}
          alt="Logo Bullet CrossFit"
          className="FirebaseError__logo"
        /> */}
      </ContentContainer>
    </div>,
    document.getElementById("error")
  );
}

export { FirebaseError };
