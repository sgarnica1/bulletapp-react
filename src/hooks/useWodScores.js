import { useState } from "react";
import {
  getAllWodScoresApi,
  getWeeklyWodScoresApi,
  getWodScoreByUserIdApi,
  getWodScoresByWodIdApi,
  postWodScoreApi,
  updateWodScoreApi,
} from "../api/wodscores";
import { getWodByDateApi } from "../api/wods";
import { info } from "../utils/info";

const useWodScores = () => {
  const [wodScores, setWodScores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAllWodScores = async () => {
    try {
      setLoading(true);
      const res = await getAllWodScoresApi();
      setWodScores(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getWeeklyWodScores = async () => {
    try {
      setLoading(true);
      const res = await getWeeklyWodScoresApi();
      setWodScores(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getWodScoresByWodId = async (idWod) => {
    try {
      setWodScores(null);
      setLoading(true);
      const res = await getWodScoresByWodIdApi(idWod);
      setWodScores(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getWodWithWodScoresByDate = async (date) => {
    try {
      setWodScores(null);
      setLoading(true);
      const wod = await getWodByDateApi(date);
      console.log(wod);
      const res = await getWodScoresByWodIdApi(wod.id);
      setWodScores({ wodScores: res, wod: wod });
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getWodScoreByUserId = async (idWod, idUser) => {
    try {
      setLoading(true);
      const res = await getWodScoreByUserIdApi(idWod, idUser);
      setWodScores(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const postWodScore = async (idWod, idUser, score) => {
    try {
      setLoading(true);
      const res = await postWodScoreApi(idWod, idUser, score);
      setWodScores(res);
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

  const updateWodScore = async (idWodScore, score) => {
    try {
      setLoading(true);
      const res = await updateWodScoreApi(idWodScore, score);
      setWodScores(res);
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

  const actions = {
    getAllWodScores,
    getWeeklyWodScores,
    getWodScoreByUserId,
    getWodScoresByWodId,
    getWodWithWodScoresByDate,
    postWodScore,
    updateWodScore,
  };

  return { wodScores, loading, error, actions };
};

export { useWodScores };
