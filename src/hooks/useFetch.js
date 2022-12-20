import { useEffect, useState } from "react";

function useFetch(endpoint, callback) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    function fetchData() {
      fetch(endpoint)
        .then((response) => {
          if (response.ok) return response.json();

          throw new Error("Cannot fetch");
        })
        .then((data) => {
          if (callback) {
            callback(data, setData, setLoading);
            if (loading) setLoading(false);
          } else {
            if (loading) setLoading(false);
            setData(data);
          }
        })
        .catch((err) => setError(err));
    }
    fetchData();
  }, [callback, endpoint, loading]);

  return { loading, data, error };
}

export { useFetch };
