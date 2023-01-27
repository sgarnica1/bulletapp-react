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
import { Register } from "./pages/Public/Register";
import { NotFound } from "./pages/Public/NotFound";
import { PasswordRecover } from "./pages/Public/PasswordRecover";

// ATHLETE PAGES
import { ChangePassword } from "./pages/Athlete/ChangePassword";
import { Home } from "./pages/Athlete/Home";
import { Leaderboard } from "./pages/Athlete/Leaderboard";
import { MovementsLibrary } from "./pages/Athlete/MovementsLibrary";
import { MovementTracking } from "./pages/Athlete/MovementTracking";
import { Profile } from "./pages/Athlete/Profile";
import { Settings } from "./pages/Athlete/Settings";

// ADMIN PAGES
import { Athletes } from "./pages/Admin/Athletes";
import { AddAthlete } from "./pages/Admin/AddAthlete";
import { AddMovement } from "./pages/Admin/AddMovement";
import { AddWod } from "./pages/Admin/AddWod";
import { Programming } from "./pages/Admin/Programming";
import { SingleAthlete } from "./pages/Admin/SingleAthlete";
import { Users } from "./pages/Admin/Users";
import { Wods } from "./pages/Admin/Wods";

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

        <Dashboard fullscreen={user ? false : true}>
          {user ? (
            <>
              <Navbar user={user} />
              <Header user={user} />
            </>
          ) : null}
          <Routes>
            {/* ---------- PUBLIC ---------- */}
            <Route element={<LoggedOutRoute />}>
              <Route path={info.routes.login.path} element={<Login />} />
              <Route path={info.routes.register.path} element={<Register />} />
              <Route
                path={info.routes.passwordRecover.path}
                element={<PasswordRecover />}
              />
            </Route>

            {/* ---------- USER ---------- */}
            <Route element={<PrivateRoute />}>
              <Route path={info.routes.home} element={<Home />} />

              {/* /leaderboard */}
              <Route
                path={info.routes.leaderboard.path}
                element={<Leaderboard />}
              />

              {/* /movements */}
              <Route path={info.routes.movements.path}>
                <Route index={true} element={<MovementsLibrary />} />
                <Route
                  path={info.routes.movements.nested.tracking.value}
                  element={<MovementTracking />}
                />
              </Route>

              {/* /skills */}
              <Route path={info.routes.skills.path}>
                <Route
                  index={true}
                  element={<MovementsLibrary skillsOnly={true} />}
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

              <Route path={info.routes.profile.path} element={<Profile />} />
            </Route>

            {/* ---------- ADMIN ---------- */}
            <Route element={<AdminRoute />}>
              <Route
                path={info.routes.movements.nested.add.path}
                element={<AddMovement />}
              />

              {/* /usuarios */}
              <Route path={info.routes.users.path} element={<Users />} />

              {/* /programacion */}
              <Route path={info.routes.programming.path}>
                <Route index={true} element={<Programming />} />

                <Route path={info.routes.programming.nested.wods.value}>
                  <Route index={true} element={<Wods />} />
                  <Route
                    path={info.routes.programming.nested.wods.nested.add.value}
                    element={<AddWod />}
                  />
                </Route>
              </Route>

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
            </Route>

            {/* ---------- OTHER ---------- */}
            <Route
              path={info.routes.serverError.value}
              element={<FirebaseError />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Dashboard>
      </div>
    </Router>
  );
}

export default App;
