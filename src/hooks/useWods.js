import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getAllWodsApi, getWeeklyWodsApi, getTodaysWodApi } from "../api/wods";
import { info } from "../utils/info";

const useWods = () => {
  const [wods, setWods] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { authTokens, logoutUser } = useAuth();

  const getAllWods = async () => {
    try {
      setLoading(true);
      const res = await getAllWodsApi();
      setWods(res);
      setLoading(false);
    } catch (err) {
      if (err.message === info.firebase.errors.auth.networkFailed) {
        setError("Error en la red");
      } else {
        setError(err);
      }
      setLoading(false);
    }
  };

  const getWeeklyWods = async (date) => {
    try {
      setLoading(true);
      const res = await getWeeklyWodsApi(date);
      setWods(res);
      setLoading(false);
    } catch (err) {
      if (err.message === info.firebase.errors.auth.networkFailed) {
        setError("Error en la red");
      } else {
        setError(err);
      }
      setLoading(false);
    }
  };

  const getTodaysWod = async () => {
    try {
      setLoading(true);
      const res = await getTodaysWodApi();
      setWods(res);
      setLoading(false);
    } catch (err) {
      if (err.message === info.firebase.errors.auth.networkFailed) {
        setError("Error en la red");
      } else {
        setError(err);
      }
      setLoading(false);
    }
  };

  const actions = { getAllWods, getTodaysWod, getWeeklyWods };

  return { wods, loading, error, actions };
};

export { useWods };
