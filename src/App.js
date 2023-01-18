import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";

// COMPONENTS
import { Dashboard } from "./components/Layout/Dashboard";
import { ErrorAlert } from "./components/Public/ErrorAlert";
import { Footer } from "./components/Layout/Footer";
import { Header } from "./components/Layout/Header";
import { Navbar } from "./components/Layout/Navbar";
import { SuccessAlert } from "./components/Public/SuccessAlert";

// PUBLIC PAGES
import { FirebaseError } from "./pages/Public/FirebaseError";
import { Login } from "./pages/Public/Login";
import { NotFound } from "./pages/Public/NotFound";
import { PasswordRecover } from "./pages/Public/PasswordRecover";

// ATHLETE PAGES
import { AddPersonalGoal } from "./pages/Athlete/AddPersonalGoal";
import { AddPersonalRecord } from "./pages/Athlete/AddPersonalRecord";
import { AddSkill } from "./pages/Athlete/AddSkill";
import { ChangePassword } from "./pages/Athlete/ChangePassword";
import { Home } from "./pages/Athlete/Home";
import { Leaderboard } from "./pages/Athlete/Leaderboard";
import { PersonalGoals } from "./pages/Athlete/PersonalGoals";
import { PersonalRecords } from "./pages/Athlete/PersonalRecords";
import { Records } from "./pages/Athlete/Records";
import { PersonalRecordHistory } from "./pages/Athlete/PersonalRecordHistory";
import { Settings } from "./pages/Athlete/Settings";
import { Skills } from "./pages/Athlete/Skills";

// ADMIN PAGES
import { Athletes } from "./pages/Admin/Athletes";
import { AddAthlete } from "./pages/Admin/AddAthlete";
import { AddMovement } from "./pages/Admin/AddMovement";
import { AddWod } from "./pages/Admin/AddWod";
import { Programming } from "./pages/Admin/Programming";
import { SingleAthlete } from "./pages/Admin/SingleAthlete";

// PROTECTED ROUTES
import ScrollToTop from "./utils/components/ScrollToTop";
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
    // console.log(user);
  }, [theme, user]);

  return (
    <Router>
      <ScrollToTop />
      <div className="App" data-theme={theme}>
        {/* ALERTS */}
        <SuccessAlert />
        <ErrorAlert />

        <Dashboard>
          {user ? (
            <>
              <Navbar user={user} />
              <Header />
            </>
          ) : null}
          <Routes>
            {/* ---------- PUBLIC ---------- */}
            <Route element={<LoggedOutRoute />}>
              <Route path={info.routes.login.path} element={<Login />} />
              <Route
                path={info.routes.passwordRecover.path}
                element={<PasswordRecover />}
              />
            </Route>

            {/* ---------- USER ---------- */}
            <Route element={<PrivateRoute />}>
              <Route path={info.routes.home} element={<Home />} />

              <Route
                path={info.routes.leaderboard.path}
                element={<Leaderboard />}
              />

              {/* /goals */}
              <Route path={info.routes.personalGoals.path}>
                <Route index={true} element={<PersonalGoals />} />
                <Route
                  path={info.routes.personalGoals.nested.add.value}
                  element={<AddPersonalGoal />}
                />
              </Route>

              {/* /prs */}
              <Route path={info.routes.prs.path + "/*"}>
                <Route index={true} element={<PersonalRecords />} />
                <Route
                  path={info.routes.prs.nested.add.value}
                  element={<AddPersonalRecord />}
                />
                <Route
                  path={info.routes.prs.nested.history.value + "/*"}
                  element={<PersonalRecordHistory />}
                />
              </Route>

              {/* /skills */}
              <Route path={info.routes.skills.path}>
                <Route index={true} element={<Skills />} />
                <Route
                  path={info.routes.skills.nested.add.value}
                  element={<AddSkill />}
                />
              </Route>

              {/* /ajustes */}
              <Route path={info.routes.settings.path}>
                <Route index={true} element={<Settings />} />
                <Route
                  path={info.routes.settings.nested.changePassword.value}
                  element={<ChangePassword />}
                />
              </Route>
            </Route>

            {/* ---------- ADMIN ---------- */}
            <Route element={<AdminRoute />}>
              <Route
                path={info.routes.movements.nested.add.path}
                element={<AddMovement />}
              />
              <Route
                path={info.routes.wods.nested.add.path}
                element={<AddWod />}
              />

              {/* /atletas */}
              <Route path={info.routes.athlete.path}>
                <Route index={true} element={<Athletes />} />
                <Route
                  path={info.routes.athlete.nested.add.value}
                  element={<AddAthlete />}
                />
                <Route
                  path={info.routes.athlete.nested.single.value}
                  element={<SingleAthlete />}
                />
              </Route>

              <Route
                path={info.routes.programming.path}
                element={<Programming />}
              />
            </Route>

            {/* ---------- OTHER ---------- */}
            <Route
              path={info.routes.serverError.value}
              element={<FirebaseError />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Dashboard>
        {user ? <Footer /> : null}
      </div>
    </Router>
  );
}

export default App;
