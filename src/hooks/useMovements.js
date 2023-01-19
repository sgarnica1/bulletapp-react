import { useState } from "react";
import {
  getMovementsApi,
  getMovementByIdApi,
  getMovementCategoriesApi,
  addMovementApi,
} from "../api/movements";
import { info } from "../utils/info";

const useMovements = () => {
  const [movements, setMovements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMovements = async () => {
    try {
      setLoading(true);
      const res = await getMovementsApi();
      setMovements(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getMovementById = async (idMovement, callback) => {
    try {
      setLoading(true);
      const res = await getMovementByIdApi(idMovement, callback);
      setMovements(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const getMovementCategories = async () => {
    try {
      setLoading(true);
      const res = await getMovementCategoriesApi();
      setMovements(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const addMovement = async (movement, callback) => {
    try {
      setLoading(true);
      const res = await addMovementApi(movement, callback);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      if (err.message === info.firebase.errors.auth.insufficientPermissions)
        return setError(info.messages.error.insufficientPermissions);
      setLoading(false);
    }
  };

  const actions = {
    getMovements,
    getMovementById,
    getMovementCategories,
    addMovement,
  };

  return { movements, loading, error, actions };
};

export { useMovements };
