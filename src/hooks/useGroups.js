import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getGroupsApi } from "../api/groups";

const useGroups = () => {
  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { authTokens, logoutUser } = useAuth();

  const getGroups = async () => {
    try {
      setLoading(true);
      const res = await getGroupsApi();
      setGroups(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { groups, loading, error, getGroups };
};

export { useGroups };
