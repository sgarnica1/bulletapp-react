import { useTheme } from "../../contexts/ThemeContext";
import { info } from "../../utils/info";

import { RegisterForm } from "../../components/Athlete/RegisterForm";
import { ContentContainer } from "../../components/Layout/ContentContainer";

// IMG
import WhiteLogo from "../../assets/img/logo_white_resized.png";
import BlackLogo from "../../assets/img/logo_black_resized.png";

function Register() {
  const { theme } = useTheme();

  return (
    <div className="Register">
      <ContentContainer>
        <header className="Register__header">
          <img
            src={theme === info.theme.dark ? WhiteLogo : BlackLogo}
            alt="Bullet CrossFit Logo"
            className="Login__header-logo"
          />
          <h1 className="Register__title">Registrarse</h1>
        </header>
        <RegisterForm />
      </ContentContainer>
    </div>
  );
}

export { Register };
