import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUsersApi, getUserByIdApi } from "../api/user";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { authTokens, logoutUser } = useAuth();

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
      console.log(res)
      setUsers(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = { getUsers, getUserById };

  return { users, loading, error, actions };
};

export { useUsers };
