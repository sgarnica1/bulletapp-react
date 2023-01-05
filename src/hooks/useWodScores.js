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
      console.log("getWodScoresByWodId");
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
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };

  const updateWodScore = async (idWodScore, score) => {
    try {
      setLoading(true);
      const res = await updateWodScoreApi(idWodScore, score);
      console.log(res);
      setWodScores(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
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
