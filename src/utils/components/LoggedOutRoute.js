import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoggedOutRoute = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export { LoggedOutRoute };
