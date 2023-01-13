import { useState } from "react";
import { getPersonalRecordsApi, postPersonalRecordApi } from "../api/personalrecords";

const usePRs = () => {
  const [prs, setPrs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPRs = async (idUser, callback) => {
    try {
      setLoading(true);
      const res = await getPersonalRecordsApi(idUser, callback);
      setPrs(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const addPR = async (idUser, data, callback) => {
    try {
      setLoading(true);
      const res = await postPersonalRecordApi(idUser, data, callback);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = { getPRs, addPR };

  return { prs, loading, error, actions };
};

export { usePRs };
