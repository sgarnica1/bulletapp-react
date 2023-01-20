import { useState } from "react";
import { getRolesApi, getRoleByTypeApi } from "../api/roles";

const useRoles = () => {
  const [roles, setRoles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  const getRoles = async () => {
    try {
      setLoading(true);
      const res = await getRolesApi();
      setRoles(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getRoleByType = async (type) => {
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

  const actions = { getRoles, getRoleByType };

  return { roles, loading, error, actions };
};

export { useRoles };
