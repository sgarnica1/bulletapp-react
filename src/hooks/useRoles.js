import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getRolesApi, getRoleByTypeApi } from "../api/roles";

const useRoles = () => {
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { authTokens, logoutUser } = useAuth();

  const getRoles = async () => {
    try {
      setLoading(true);
      const res = await getRolesApi();
      console.log(res);
      setRoles(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getRoleById = async (type) => {
    try {
      setLoading(true);
      const res = await getRoleByTypeApi(type);
      setRoles(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = { getRoles, getRoleById };

  return { roles, loading, error, actions };
};

export { useRoles };