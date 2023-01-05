import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getPlansApi } from "../api/plans";

const usePlans = () => {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { authTokens, logoutUser } = useAuth();

  const getPlans = async () => {
    try {
      setLoading(true);
      const res = await getPlansApi();
      setPlans(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = { getPlans };

  return { plans, loading, error, actions };
};

export { usePlans };
