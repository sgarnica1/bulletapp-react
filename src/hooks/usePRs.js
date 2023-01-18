import { useState } from "react";
import {
  getPRsApi,
  getSinglePRApi,
  postPRApi,
  updatePRApi,
} from "../api/personalrecords";

const usePRs = () => {
  const [prs, setPrs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getPRs = async (idUser, callback) => {
    try {
      setLoading(true);
      const res = await getPRsApi(idUser, callback);
      setPrs(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getSinglePR = async (idUser, idPR, callback) => {
    try {
      setLoading(true);
      const res = await getSinglePRApi(idUser, idPR, callback);
      setPrs(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const postPR = async (idUser, data, callback) => {
    try {
      setLoading(true);
      const res = await postPRApi(idUser, data, callback);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const updatePR = async (idUser, idPR, data, callback) => {
    try {
      setLoading(true);
      const res = await updatePRApi(idUser, idPR, data, callback);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = { getPRs, getSinglePR, postPR, updatePR };

  return { prs, loading, error, actions };
};

export { usePRs };
