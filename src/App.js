import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
// COMPONENTS
import { Dashboard } from "./components/Layout/Dashboard";
import { Header } from "./components/Layout/Header";
import { Navbar } from "./components/Layout/Navbar";

// PAGES
import { Athletes } from "./pages/Admin/Athletes";
import { AddAthlete } from "./pages/Admin/AddAthlete";
import { FirebaseError } from "./pages/Public/FirebaseError";
import { Home } from "./pages/Athlete/Home";
import { Leaderboard } from "./pages/Athlete/Leaderboard";
import { Login } from "./pages/Public/Login";
import { NotFound } from "./pages/Public/NotFound";
import { Records } from "./pages/Athlete/Records";
import { Settings } from "./pages/Athlete/Settings";
import { SingleAthlete } from "./pages/Admin/SingleAthlete";

// PROTECTED ROUTES
import { AdminRoute } from "./utils/components/AdminRoute";
import { LoggedOutRoute } from "./utils/components/LoggedOutRoute";
import { PrivateRoute } from "./utils/components/PrivateRoute";

// OTHER
import { info } from "./utils/info";

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
              <Route path={info.routes.login} element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path={info.routes.home} element={<Home />} />
              <Route path={info.routes.leaderboard} element={<Leaderboard />} />
              <Route path={info.routes.records} element={<Records />} />
              <Route path={info.routes.settings} element={<Settings />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path={info.routes.athletes} element={<Athletes />} />
              <Route path={info.routes.addAthlete} element={<AddAthlete />} />
              <Route path="/atletas/:id" element={<SingleAthlete />} />
            </Route>

            <Route path={info.routes.serverError} element={<FirebaseError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Dashboard>
      </div>
    </Router>
  );
}

export default App;
