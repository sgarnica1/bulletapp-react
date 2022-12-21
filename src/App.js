import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
import { Navbar } from "./components/Navbar/Navbar";
import { Header } from "./components/Header/Header";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Athletes } from "./pages/Athletes";
import { AddAthlete } from "./pages/AddAthlete";
import { SingleAthlete } from "./pages/SingleAthlete";
import { NotFound } from "./pages/NotFound";
import { PrivateRoute } from "./utils/components/PrivateRoute";
import { LoggedOutRoute } from "./utils/components/LoggedOutRoute";
import "./sass/main.scss";

// TODO - Finish Add athlete form
// TODO - Query current user info

function App() {
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
    console.log(user)
  }, [theme]);

  return (
    <Router>
      <div className="App" data-theme={theme}>
        <Dashboard>
          {user ? (
            <>
              <Navbar />
              <Header />
            </>
          ) : null}

          <Routes>
            <Route element={<LoggedOutRoute />}>
              <Route path={"/login"} element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/atletas" element={<Athletes />} />
              <Route path="/atletas/nuevo" element={<AddAthlete />} />
              <Route path="/atletas/:id" element={<SingleAthlete />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Dashboard>
      </div>
    </Router>
  );
}

export default App;
