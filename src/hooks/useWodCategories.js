import { useState } from "react";
import { getWodCategoriesApi } from "../api/wodcategories";
import { useLocalStorage } from "./useLocalStorage";
import { info } from "../utils/info";

const useWodCategories = () => {
  const [wodCategories, setWodCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [storedWodCategories, setStoredWodCategories] = useLocalStorage(
    info.localStorageKeys.wodCategories,
    []
  );

  const getWodCategories = async () => {
    try {
      setLoading(true);
      if (storedWodCategories.length > 0) {
        await setWodCategories(storedWodCategories);
        setLoading(false);
        return;
      }
      const res = await getWodCategoriesApi();
      setStoredWodCategories(res);
      console.log(res);
      setWodCategories(res);
      setLoading(false);
    } catch (err) {
      if (err.message === info.firebase.errors.auth.networkFailed) {
        setError("Error en la red");
      } else {
        setError(err);
      }
      setLoading(false);
    }
  };

  const actions = {
    getWodCategories,
  };

  return { wodCategories, loading, error, actions };
};

export { useWodCategories };
