import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
// COMPONENTS
import { Navbar } from "./components/Layout/Navbar";
import { Header } from "./components/Layout/Header";
import { Dashboard } from "./components/Layout/Dashboard";

// PAGES
import { Login } from "./pages/Public/Login";
import { NotFound } from "./pages/Public/NotFound";
import { Home } from "./pages/Athlete/Home";
import { Athletes } from "./pages/Admin/Athletes";
import { AddAthlete } from "./pages/Admin/AddAthlete";
import { SingleAthlete } from "./pages/Admin/SingleAthlete";

// PROTECTED ROUTES
import { PrivateRoute } from "./utils/components/PrivateRoute";
import { AdminRoute } from "./utils/components/AdminRoute";
import { LoggedOutRoute } from "./utils/components/LoggedOutRoute";

// OTHER
import { info } from "./utils/info";
import "./sass/main.scss";

// TODO - Finish Add athlete form

function App() {
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
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
            </Route>
            <Route element={<AdminRoute />}>
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
