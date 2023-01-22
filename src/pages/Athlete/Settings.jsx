import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
// import { useTheme } from "../../contexts/ThemeContext";
import { useDashboard } from "../../contexts/DashboardContext";

import { info } from "../../utils/info";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { Button } from "../../components/Public/Button";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { InfoCard } from "../../components/Public/InfoCard";

// IMG - ICONS
import LockIcon from "../../assets/icon/lock.svg";
// import DarkModeIcon from "../../assets/icon/darkmode.svg";

// TODO - Replace user name, user img and user email with real one

function Settings() {
  const { user, loading, error, logoutUser } = useAuth();
  // const { theme, toggleTheme } = useTheme();
  const { setActiveView } = useDashboard();

  useEffect(() => {
    setActiveView(info.views.settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Settings">
      <ContentContainer>
        <BackButton link={info.routes.home} mb={true} />
        <h1 className="title margin">Ajustes</h1>
        {!error && !loading && (
          <InfoCard
            title={`${user.data[info.firebase.docKeys.users.firstName]} ${
              user.data[info.firebase.docKeys.users.lastName]
            }`}
            additionalInfo={user.data[info.firebase.docKeys.users.email]}
          />
        )}
        <InfoCard
          link={info.routes.settings.nested.changePassword.absolutePath}
          icon={LockIcon}
          alt="Lock icon"
          title={"Cambiar contraseña"}
        />
        {/* <InfoCard
          icon={DarkModeIcon}
          alt="Half moon icon"
          title={"Modo Obscuro"}
          onClickHandler={toggleTheme}
        >
          {theme === info.theme.dark ? "Desactivar" : "Activar"}
        </InfoCard> */}

        <Button
          onClickHandler={logoutUser}
          style={info.components.button.classes.primary}
          size={info.components.button.classes.lg}
          fill={false}
          text={"Cerrar sesión"}
        />
      </ContentContainer>
    </div>
  );
}

export { Settings };
