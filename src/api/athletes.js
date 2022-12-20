import { API_BASE_URL } from "../utils/requests";
import { formatHour, formatDate } from "../utils/utils";

const getAthletesApi = async (token, callback, abortCont) => {
  try {
    const res = await fetch(
      API_BASE_URL + "/athletes/",
      fetchConfigGET(token, abortCont)
    );
    const data = await res.json();

    if (res.statusText === "Unauthorized") return callback();
    return getAthleteDetails(token, data);
  } catch (err) {
    throw err;
  }
};

const addAthleteApi = async (bodyData, token, callback, signal) => {
  try {
    const res = await fetch(
      API_BASE_URL + "/athletes/",
      fetchConfigPOST(token, bodyData, signal)
    );
    const data = await res.json();
    if (!res.ok) throw Error([data.email, data.phone_number]);

    callback();
    return res.json();
  } catch (err) {
    alert("Error");
    console.log(err);
  }
};

const updateAthleteApi = async (bodyData, token, callback, id) => {
  const endpoint = `${API_BASE_URL}/athletes/${id}/`;
  try {
    const res = await fetch(endpoint, fetchConfigPUT(token, bodyData));
    console.log(res);
    const data = await res.json();
    console.log(data);
    callback();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const deleteAthleteApi = async (token, callback, id) => {
  const endpoint = `${API_BASE_URL}/athletes/${id}/`;
  try {
    await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + String(token),
      },
    });
    callback();
  } catch (err) {
    console.log(err);
  }
};

const getAthleteByIdApi = async (token, callback, id,) => {
  const endpoint = `${API_BASE_URL}/athletes/${id}/`;
  try {
    const res = await fetch(endpoint, fetchConfigGET(token));
    const data = await res.json();

    if (res.statusText === "Unauthorized") return callback();

    return getSingleAthleteDetails(token, data);
    // return data
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAthletesByPlanApi = async (token, callback, id) => {
  const endpoint = `${API_BASE_URL}/plans/${id}/atletas/`;

  try {
    const res = await fetch(endpoint, fetchConfigGET(token));
    const data = await res.json();

    if (res.statusText === "Unauthorized") return callback();

    return data;
  } catch (err) {
    throw err;
  }
};

// UTILS`

const fetchConfigGET = (token, abortCont) => {
  if (abortCont) {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
      signal: abortCont,
    };
  }
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  };
};

const fetchConfigPOST = (token, data) => ({
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + String(token),
  },
});

const fetchConfigPUT = (token, data) => ({
  method: "PUT",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + String(token),
  },
});

const getAthleteDetails = (token, data) => {
  const updatedAthletes = data.map((athlete) => {
    athlete.created = formatDate(athlete.created);
    const getSchedule = fetch(athlete.schedule, fetchConfigGET(token))
      .then((response) => {
        if (response.ok) return response.json();
        throw Error("Cannot fetch");
      })
      .then((data) => {
        const hour = formatHour(data.hour);
        athlete.schedule = hour;
      });

    const getPlan = fetch(athlete.plan, fetchConfigGET(token))
      .then((response) => {
        if (response.ok) return response.json();
        throw Error("Cannot fetch");
      })
      .then((data) => (athlete.plan = data.name));

    return Promise.all([getSchedule, getPlan]).then(() => athlete);
  });
  return Promise.all(updatedAthletes).then((athletes) => athletes);
};

const getSingleAthleteDetails = async (token, data) => {
  const athlete = await data;
  athlete.created = formatDate(athlete.created);

  const getSchedule = fetch(athlete.schedule, fetchConfigGET(token))
    .then((response) => {
      if (response.ok) return response.json();
      throw Error("Cannot fetch");
    })
    .then((data) => {
      const hour = formatHour(data.hour);
      athlete.schedule = {
        hour: hour,
        id: data.id,
      };
    });

  const getPlan = fetch(athlete.plan, fetchConfigGET(token))
    .then((response) => {
      if (response.ok) return response.json();
      throw Error("Cannot fetch");
    })
    .then((data) => {
      athlete.plan = {
        name: data.name,
        id: data.id,
      };
    });

  if (athlete.beneficiary) {
    const getBeneficiary = fetch(athlete.beneficiary, fetchConfigGET(token))
      .then((response) => {
        if (response.ok) return response.json();
        throw Error("Cannot fetch");
      })
      .then((data) => {
        athlete.beneficiary = data;
      })
      .catch((err) => console.log(err));
    return Promise.all([getSchedule, getPlan, getBeneficiary]).then(
      () => athlete
    );
  }

  return Promise.all([getSchedule, getPlan]).then(() => athlete);
};

export {
  getAthletesApi,
  addAthleteApi,
  updateAthleteApi,
  deleteAthleteApi,
  getAthleteByIdApi,
  getAthletesByPlanApi,
};
