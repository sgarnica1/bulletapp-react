import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar/Navbar";
import { Header } from "./components/Header/Header";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Athletes } from "./pages/Athletes/Athletes";
import { AddAthlete } from "./pages/AddAthlete/AddAthlete";
import { SingleAthlete } from "./pages/SingleAthlete/SingleAthlete";
import { NotFound } from "./pages/NotFound/NotFound";
import { PrivateRoute } from "./utils/components/PrivateRoute";
import { LoggedOutRoute } from "./utils/components/LoggedOutRoute";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="App">
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
