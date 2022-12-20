import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getSchedulesApi } from "../api/schedules";

const useSchedules = () => {
  const [schedules, setSchedules] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { authTokens, logoutUser } = useAuth();

  const getSchedules = async () => {
    try {
      setLoading(true);
      const res = await getSchedulesApi(authTokens.access, logoutUser);
      setSchedules(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { schedules, loading, error, getSchedules };
};

export { useSchedules };
