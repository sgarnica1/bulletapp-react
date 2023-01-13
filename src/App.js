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
import { RecordHistory } from "./pages/Athlete/RecordHistory";
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
              <Route path={info.routes.login} element={<Login />} />
              <Route path={info.routes.passwordRecover} element={<PasswordRecover />} />
            </Route>

            {/* ---------- USER ---------- */}
            <Route element={<PrivateRoute />}>
              <Route path={info.routes.addPersonalGoal} element={<AddPersonalGoal />}/>
              <Route path={info.routes.addPersonalRecord} element={<AddPersonalRecord />}/>
              <Route path={info.routes.addSkill} element={<AddSkill />}/>
              <Route path={info.routes.changePassword} element={<ChangePassword />} />
              <Route path={info.routes.home} element={<Home />} />
              <Route path={info.routes.leaderboard} element={<Leaderboard />} />
              <Route path={info.routes.records} element={<Records />} />
              <Route path={info.routes.recordHistory + "/:id"} element={<RecordHistory />}/>
              <Route path={info.routes.personalGoals} element={<PersonalGoals />} />
              <Route path={info.routes.prs} element={<PersonalRecords />} />
              <Route path={info.routes.settings} element={<Settings />} />
              <Route path={info.routes.skills} element={<Skills />} />
            </Route>

            {/* ---------- ADMIN ---------- */}
            <Route element={<AdminRoute />}>
              <Route path={info.routes.addAthlete} element={<AddAthlete />} />
              <Route path={info.routes.addMovement} element={<AddMovement />} />
              <Route path={info.routes.addWod} element={<AddWod />} />
              <Route path={info.routes.athletes} element={<Athletes />} />
              <Route path={info.routes.programming} element={<Programming />} />
              <Route path={info.routes.singleAthlete + "/:id"} element={<SingleAthlete />} />
            </Route>

            {/* ---------- OTHER ---------- */}
            <Route path={info.routes.serverError} element={<FirebaseError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Dashboard>
      </div>
    </Router>
  );
}

export default App;
