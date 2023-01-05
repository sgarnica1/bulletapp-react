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
  const { user, loading, error } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="Settings">
      <ContentContainer>
        <h1 className="title margin">Ajustes</h1>
        {!error && !loading && (
          <InfoCard
            // link={info.routes.profile}
            img={HoodiesImg}
            alt="Athletes wearing Bullet CrossFit hoodies"
            title={`${user.data[info.firebase.docKeys.users.firstName]} ${
              user.data[info.firebase.docKeys.users.lastName]
            }`}
            additionalInfo={user.data[info.firebase.docKeys.users.email]}
          />
        )}
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
