import { useState } from "react";
import { getScoreTypesApi } from "../api/scoreTypes";

const useScoreTypes = () => {
  const [scoreTypes, setScoreTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getScoreTypes = async () => {
    try {
      setLoading(true);
      const res = await getScoreTypesApi();
      setScoreTypes(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = { getScoreTypes };

  return { scoreTypes, loading, error, actions };
};

export { useScoreTypes };
