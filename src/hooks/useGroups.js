import { useState } from "react";
import { getGroupsApi } from "../api/groups";

const useGroups = () => {
  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


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

  const actions = { getGroups };

  return { groups, loading, error, actions };
};

export { useGroups };
