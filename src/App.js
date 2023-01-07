import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
// COMPONENTS
import { Dashboard } from "./components/Layout/Dashboard";
import { ErrorAlert } from "./components/Public/ErrorAlert";
import { Header } from "./components/Layout/Header";
import { Navbar } from "./components/Layout/Navbar";
import { SuccessAlert } from "./components/Public/SuccessAlert";

// PAGES
import { Athletes } from "./pages/Admin/Athletes";
import { AddAthlete } from "./pages/Admin/AddAthlete";
import { ChangePassword } from "./pages/Athlete/ChangePassword";
import { FirebaseError } from "./pages/Public/FirebaseError";
import { Home } from "./pages/Athlete/Home";
import { Leaderboard } from "./pages/Athlete/Leaderboard";
import { Login } from "./pages/Public/Login";
import { NotFound } from "./pages/Public/NotFound";
import { PasswordRecover } from "./pages/Public/PasswordRecover";
import { Records } from "./pages/Athlete/Records";
import { RecordHistory } from "./pages/Athlete/RecordHistory";
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
  }, [theme, user]);

  return (
    <Router>
      <div className="App" data-theme={theme}>
        {/* SUCCESS ALERT */}
        <SuccessAlert />
        {/* ERROR ALERT */}
        <ErrorAlert />

        <Dashboard>
          {user ? (
            <>
              <Navbar user={user} />
              <Header />
            </>
          ) : null}
          <Routes>
            {/* PUBLIC */}
            <Route element={<LoggedOutRoute />}>
              <Route path={info.routes.login} element={<Login />} />
              <Route
                path={info.routes.passwordRecover}
                element={<PasswordRecover />}
              />
            </Route>
            {/* USER */}
            <Route element={<PrivateRoute />}>
              <Route
                path={info.routes.changePassword}
                element={<ChangePassword />}
              />
              <Route path={info.routes.home} element={<Home />} />
              <Route path={info.routes.leaderboard} element={<Leaderboard />} />
              <Route path={info.routes.records} element={<Records />} />
              <Route
                path={info.routes.recordHistory + "/:id"}
                element={<RecordHistory />}
              />
              <Route path={info.routes.settings} element={<Settings />} />
            </Route>
            {/* ADMIN */}
            <Route element={<AdminRoute />}>
              <Route path={info.routes.addAthlete} element={<AddAthlete />} />
              <Route path={info.routes.athletes} element={<Athletes />} />
              <Route
                path={info.routes.singleAthlete + "/:id"}
                element={<SingleAthlete />}
              />
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
