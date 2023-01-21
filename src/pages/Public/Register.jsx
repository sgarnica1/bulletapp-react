import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { info } from "../../utils/info";

import { RegisterForm } from "../../components/Athlete/RegisterForm";

// IMG
import WhiteLogo from "../../assets/img/logo_white_resized.png";
import BlackLogo from "../../assets/img/logo_black_resized.png";

function Register() {
  const [passInputType, setPassInputType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser, error, setError, loggingIn } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="Login">
      <main className="Login__main">
        <header className="Login__header">
          <img
            src={theme === info.theme.dark ? WhiteLogo : BlackLogo}
            alt="Bullet CrossFit Logo"
            className="Login__header-logo"
          />
        </header>
        <RegisterForm />
      </main>
      <section className="Login__background-img"></section>
    </div>
  );
}

export { Register };
