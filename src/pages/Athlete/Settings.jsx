import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { info } from "../../utils/info";

// COMPONENTS
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { InfoCard } from "../../components/Public/InfoCard";

// IMG - ICONS
import LockIcon from "../../assets/icon/lock.svg";
import DarkModeIcon from "../../assets/icon/darkmode.svg";
import HoodiesImg from "../../assets/img/sudaderas.jpg";

// TODO - Replace user name, user img and user email with real one

function Settings() {
  // const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="Settings">
      <ContentContainer>
        <h1 className="Settings__title">Ajustes</h1>
        <InfoCard
          link={info.routes.profile}
          img={HoodiesImg}
          alt="Athletes wearing Bullet CrossFit hoodies"
          title={"Sergio Garnica González"}
          additionalInfo="sgarnica1902@gmail.com"
        />
        <InfoCard
          link={info.routes.changePassword}
          icon={LockIcon}
          alt="Lock icon"
          title={"Cambiar contraseña"}
        />
        <InfoCard
          icon={DarkModeIcon}
          alt="Half moon icon"
          title={"Modo Obscuro"}
          onClickHandler={toggleTheme}
        >
          {theme === info.states.theme.dark ? "Desactivar" : "Activar"}
        </InfoCard>
      </ContentContainer>
    </div>
  );
}

export { Settings };
