import { useState } from "react";
import {
  getRecordsApi,
  getLastRepMaxApi,
  getSingleRecordApi,
  postRecordApi,
  updateRecordApi,
  updateLatestRepMaxApi,
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

  const getLastRepMax = async (idUser, callback) => {
    try {
      setLoading(true);
      const res = await getLastRepMaxApi(idUser, callback);
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

  const updateLatestRepMax = async (idUser, data, callback) => {
    try {
      setLoading(true);
      const res = await updateLatestRepMaxApi(idUser, data, callback);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = {
    getRecords,
    getLastRepMax,
    getSingleRecord,
    postRecord,
    updateRecord,
    updateLatestRepMax,
  };

  return { records, loading, error, actions };
};

export { useRecords };
