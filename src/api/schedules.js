import { API_BASE_URL } from "../utils/requests";

const getSchedulesApi = async (token, callback) => {
  try {
    const res = await fetch(API_BASE_URL + "/schedule/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
    });
    const data = await res.json();

    if (res.statusText === "Unauthorized") return callback();

    return data;
  } catch (err) {
    throw err;
  }
};

export { getSchedulesApi };
