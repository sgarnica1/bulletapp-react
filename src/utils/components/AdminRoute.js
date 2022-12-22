import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { info } from "../info";

const AdminRoute = () => {
  const { user } = useAuth();
  return user?.data?.role === info.firebase.values.roles.admin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export { AdminRoute };
