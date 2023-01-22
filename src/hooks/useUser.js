import { useState } from "react";
import { getUsersApi, getUserByIdApi, activateUserApi, deactivateUserApi } from "../api/user";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsersApi();
      setUsers(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getUserById = async (id, callback) => {
    try {
      setLoading(true);
      const res = await getUserByIdApi(id, callback);
      console.log(res);
      setUsers(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const activateUser = async (uid, callback) => {
    try {
      setLoading(true);
      await activateUserApi(uid, callback);
      setUsers(true);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const deactivateUser = async (uid, callback) => {
    try {
      setLoading(true);
      await deactivateUserApi(uid, callback);
      setUsers(true);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = { getUsers, getUserById, activateUser, deactivateUser };

  return { users, loading, error, actions };
};

export { useUsers };
