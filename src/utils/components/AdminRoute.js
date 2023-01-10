import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { info } from "../info";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if ((user && user.data) || !loading)
    return user?.data?.role === info.firebase.values.roles.admin ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );

  return null;
};

export { AdminRoute };
