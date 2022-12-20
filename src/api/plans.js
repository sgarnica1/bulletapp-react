import { API_BASE_URL } from "../utils/requests";

const getPlansApi = async (token, callback) => {
  try {
    const res = await fetch(API_BASE_URL + "/plans/", {
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

export { getPlansApi };
