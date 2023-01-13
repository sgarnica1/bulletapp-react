import { useState } from "react";
import {
  getAllWodsApi,
  getTodaysWodApi,
  getWodByDateApi,
  postWodApi,
} from "../api/wods";
import { getWodScoresByWodIdApi } from "../api/wodscores";
import { info } from "../utils/info";

const useWods = () => {
  const [wods, setWods] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const getTodaysWod = async () => {
    try {
      setLoading(true);
      const wod = await getTodaysWodApi();
      const scores = await getWodScoresByWodIdApi(wod.id);
      wod.scores = scores;
      setWods(wod);
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
      console.log(res);
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

  const getWodByDateWithScores = async (date) => {
    try {
      setWods(null);
      setLoading(true);
      const wod = await getWodByDateApi(date);
      const scores = await getWodScoresByWodIdApi(wod.id);
      wod.scores = scores;
      setWods(wod);
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
    getWodByDate,
    getWodByDateWithScores,
    postWod,
    resetWodsState,
  };

  return { wods, loading, error, actions };
};

export { useWods };
