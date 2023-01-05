import { useState } from "react";
import { getLocationsApi } from "../api/locations";

const useLocations = () => {
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getLocations = async () => {
    try {
      setLoading(true);
      const res = await getLocationsApi();
      setLocations(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const actions = { getLocations };

  return { locations, loading, error, actions };
};

export { useLocations };
