import { useState } from "react";
import {
  getRecordsApi,
  getLatestActitvityApi,
  getSingleRecordApi,
  postRecordApi,
  updateRecordApi,
  updateLatestAcivityApi,
} from "../api/records";

const useRecords = () => {
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getRecords = async (idUser, callback) => {
    try {
      setLoading(true);
      const res = await getRecordsApi(idUser, callback);
      console.log(res);
      setRecords(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getLatestActitvity = async (idUser, callback) => {
    try {
      setLoading(true);
      const res = await getLatestActitvityApi(idUser, callback);
      setRecords(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getSingleRecord = async (idUser, idRecord, callback) => {
    try {
      setLoading(true);
      const res = await getSingleRecordApi(idUser, idRecord, callback);
      setRecords(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const postRecord = async (idUser, idMov, data, callback) => {
    try {
      setLoading(true);
      const res = await postRecordApi(idUser, idMov, data, callback);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const updateRecord = async (idUser, idRecord, data, callback) => {
    try {
      setLoading(true);
      const res = await updateRecordApi(idUser, idRecord, data, callback);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const updateLatestAcivity = async (
    idUser,
    data,
    newSkill,
    updateSkill,
    callback
  ) => {
    try {
      setLoading(true);
      const res = await updateLatestAcivityApi(
        idUser,
        data,
        newSkill,
        updateSkill,
        callback
      );
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = {
    getRecords,
    getLatestActitvity,
    getSingleRecord,
    postRecord,
    updateRecord,
    updateLatestAcivity,
  };

  return { records, loading, error, actions };
};

export { useRecords };
