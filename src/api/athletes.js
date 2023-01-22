import { db, auth } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore/lite";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { info } from "../utils/info";

import { API_BASE_URL } from "../utils/requests";
import { utils } from "../utils/utils";

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

// TODO - Update temporary password
// TODO - Send email to user when created to change password
// TODO - Handle errors on UI when creating user (eg. email already exists, password too weak, etc.)
const addAthleteApi = async (athlete, callback) => {
  let user;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      athlete.email,
      "password"
    );
    user = userCredential.user;
  } catch (err) {
    console.log(err);
    throw err;
  }

  try {
    const res = await setDoc(doc(db, "users", user.uid), {
      // FIRST NAME
      [info.firebase.docKeys.users.firstName]:
        athlete[info.firebase.docKeys.users.firstName],
      // LAST NAME
      [info.firebase.docKeys.users.lastName]:
        athlete[info.firebase.docKeys.users.lastName],
      // EMAIL
      [info.firebase.docKeys.users.email]:
        athlete[info.firebase.docKeys.users.email],
      // PHONE NUMBER
      [info.firebase.docKeys.users.phoneNumber]:
        athlete[info.firebase.docKeys.users.phoneNumber],
      // PLAN
      [info.firebase.docKeys.users.plan]:
        athlete[info.firebase.docKeys.users.plan],
      // SCHEDULE
      [info.firebase.docKeys.users.schedule]:
        athlete[info.firebase.docKeys.users.schedule],
      // ROLE
      [info.firebase.docKeys.users.role]: info.firebase.values.roles.athlete,
      // BIRTHDAY
      [info.firebase.docKeys.users.birthDay]: parseInt(
        athlete[info.firebase.docKeys.users.birthDay]
      ),
      // BIRTHMONTH
      [info.firebase.docKeys.users.birthMonth]: parseInt(
        athlete[info.firebase.docKeys.users.birthMonth]
      ),
      // ACTIVE
      [info.firebase.docKeys.users.active]: true,
      // TIMESTAMPS
      timestamps: {
        [info.firebase.docKeys.users.timestamps.createdAt]: Timestamp.fromDate(
          new Date()
        ),
        [info.firebase.docKeys.users.timestamps.updatedAt]: Timestamp.fromDate(
          new Date()
        ),
      },
    });

    console.log(res);

    callback();
    return res;
  } catch (err) {
    console.log(err);
    throw err;
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
    throw err;
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

const getAthleteByIdApi = async (token, callback, id) => {
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
    athlete.created = utils.formatDate(athlete.created);
    const getSchedule = fetch(athlete.schedule, fetchConfigGET(token))
      .then((response) => {
        if (response.ok) return response.json();
        throw Error("Cannot fetch");
      })
      .then((data) => {
        const hour = utils.formatHour(data.hour);
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
  athlete.created = utils.formatDate(athlete.created);

  const getSchedule = fetch(athlete.schedule, fetchConfigGET(token))
    .then((response) => {
      if (response.ok) return response.json();
      throw Error("Cannot fetch");
    })
    .then((data) => {
      const hour = utils.formatHour(data.hour);
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
