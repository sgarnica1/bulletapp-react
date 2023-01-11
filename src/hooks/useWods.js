import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getAllWodsApi,
  getWeeklyWodsApi,
  getTodaysWodApi,
  getWodByDateApi,
  postWodApi,
} from "../api/wods";
import { info } from "../utils/info";

const useWods = () => {
  const [wods, setWods] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const getWeeklyWods = async () => {
    try {
      setLoading(true);
      const res = await getWeeklyWodsApi();
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

  const getWodByDate = async (date) => {
    try {
      setWods(null);
      setLoading(true);
      const res = await getWodByDateApi(date);
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

  const postWod = async (wodData, callback) => {
    try {
      setLoading(true);
      const wod = await getWodByDateApi(wodData.date);
      if (wod) throw new Error(info.messages.error.wodAlreadyExists);
      const res = await postWodApi(wodData, callback);
      setWods(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.message === info.firebase.errors.auth.networkFailed)
        return setError(info.messages.error.networkFailed);

      if (err.message === info.firebase.errors.auth.insufficientPermissions)
        return setError(info.messages.error.insufficientPermissions);

      setError(err);
    }
  };

  const resetWodsState = () => setWods(null);

  const actions = {
    getAllWods,
    getTodaysWod,
    getWeeklyWods,
    getWodByDate,
    postWod,
    resetWodsState,
  };

  return { wods, loading, error, actions };
};

export { useWods };
