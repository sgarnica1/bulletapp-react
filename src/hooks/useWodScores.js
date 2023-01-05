import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getAllWodScoresApi,
  getWeeklyWodScoresApi,
  getWodScoreByUserIdApi,
  getWodScoresByWodIdApi,
  postWodScoreApi,
  updateWodScoreApi,
} from "../api/wodscores";

const useWodScores = () => {
  const [wodScores, setWodScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { authTokens, logoutUser } = useAuth();

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
      setLoading(true);
      const res = await getWodScoresByWodIdApi(idWod);
      setWodScores(res);
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
    postWodScore,
    updateWodScore,
  };

  return { wodScores, loading, error, actions };
};

export { useWodScores };
