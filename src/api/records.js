import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  arrayUnion,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

// DOCUMENT KEYS

const movementKey = [info.firebase.docKeys.records.movement];
const movementCategoryKey = [info.firebase.docKeys.records.movementCategory];
const timeScoreKey = [info.firebase.docKeys.records.timescore];
const [distanceScoreKey] = [info.firebase.docKeys.records.distancescore];
const dateKey = [info.firebase.docKeys.records.scores.date];
const weightKey = [info.firebase.docKeys.records.scores.weight];
const repsKey = [info.firebase.docKeys.records.scores.reps];
const setsKey = [info.firebase.docKeys.records.scores.sets];
const distanceKey = [info.firebase.docKeys.records.scores.distance];
const secondsKey = [info.firebase.docKeys.records.scores.seconds];
const unitsKey = [info.firebase.docKeys.records.scores.units];
const createdAtKey = [info.firebase.docKeys.wodScores.timestamps.createdAt];
const updatedAtKey = [info.firebase.docKeys.wodScores.timestamps.updatedAt];

const getRecordsApi = async (idUser, callback) => {
  try {
    const ref = collection(
      db,
      `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.records}`
    );
    const query_ = query(ref);
    const snapshot = await getDocs(query_);
    let lastrepmaxIndex = 0;
    const data = snapshot.docs.map((doc, index) => {
      if (doc.id === "lastrepmax") lastrepmaxIndex = index;
      return { id: doc.id, ...doc.data() };
    });

    const lastrepmax = data.splice(lastrepmaxIndex, 1);

    if (callback) callback(data);
    return [data, lastrepmax[0]];
  } catch (err) {
    console.log(err);
  }
};

const getLatestActitvityApi = async (idUser, callback) => {
  try {
    const ref = doc(
      db,
      `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.records}/lastrecord`
    );

    const snapshot = await getDoc(ref);
    const data = snapshot.data();
    if (callback) callback(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getSingleRecordApi = async (idUser, idRecord, callback) => {
  try {
    const ref = doc(
      db,
      `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.records}/${idRecord}`
    );
    const snapshot = await getDoc(ref);
    if (callback) callback(snapshot.data());
    if (snapshot.data() === undefined) return -1;
    return snapshot.data();
  } catch (err) {
    console.log(err);
  }
};

const postRecordApi = async (idUser, idMov, data, callback) => {
  console.log("addRecord", data);
  try {
    const res = await setDoc(
      doc(
        db,
        `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.records}/${idMov}`
      ),
      {
        [movementKey]: data[movementKey],
        [movementCategoryKey]: data[movementCategoryKey],
        [timeScoreKey]: data[timeScoreKey],
        [distanceScoreKey]: data[distanceScoreKey],
        scores: [
          {
            [dateKey]: Timestamp.fromDate(data[dateKey]),
            [weightKey]: parseFloat(data[weightKey]),
            [repsKey]: parseFloat(data[repsKey]),
            [setsKey]: parseFloat(data[setsKey]),
            [secondsKey]: parseFloat(data[secondsKey]),
            [distanceKey]: parseFloat(data[distanceKey]),
            [unitsKey]: data[unitsKey],
          },
        ],
        timestamps: {
          [createdAtKey]: Timestamp.fromDate(new Date()),
          [updatedAtKey]: Timestamp.fromDate(new Date()),
        },
      }
    );
    if (callback) callback();
    return res;
  } catch (err) {
    if (callback) callback(err);
    console.log(err);
    throw err;
  }
};

const updateRecordApi = async (idUser, idMov, data, callback) => {
  try {
    const ref = doc(
      db,
      `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.records}/${idMov}`
    );
    const res = await updateDoc(ref, {
      scores: arrayUnion({
        [dateKey]: Timestamp.fromDate(data[dateKey]),
        [weightKey]: parseFloat(data[weightKey]),
        [repsKey]: parseFloat(data[repsKey]),
        [setsKey]: parseFloat(data[setsKey]),
        [secondsKey]: parseFloat(data[secondsKey]),
        [distanceKey]: parseFloat(data[distanceKey]),
        [unitsKey]: data[unitsKey],
      }),
    });
    if (callback) callback(res);
    return res;
  } catch (err) {
    if (callback) callback(err);
    throw err;
  }
};

const updateLatestAcivityApi = async (
  idUser,
  data,
  newSkill,
  updateSkill,
  callback
) => {
  const lastactivity = await getLatestActitvityApi(idUser);
  console.log(updateSkill, newSkill);

  let newrepmax = null;
  const isRepMax =
    data[repsKey] === 1 && data[setsKey] === 1 && data[weightKey] > 0;

  if (isRepMax) {
    newrepmax = {
      // DATA
      [movementKey]: data[movementKey],
      [dateKey]: Timestamp.fromDate(data[dateKey]),
      [weightKey]: parseFloat(data[weightKey]),
      [unitsKey]: data[unitsKey],
      [repsKey]: parseFloat(data[repsKey]),
      [setsKey]: parseFloat(data[setsKey]),
    };
  }
  // COMPARE DATE IN ORDER TO UPDATE TO LATEST REP MAX
  const previousDate =
    lastactivity && lastactivity.repmax
      ? lastactivity.repmax[dateKey].seconds
      : 0;
  const currentDate = data[dateKey].getTime() / 1000;

  if (
    lastactivity &&
    lastactivity.repmax &&
    ((isRepMax && previousDate > currentDate) || !isRepMax)
  )
    newrepmax = lastactivity.repmax;

  newrepmax = newrepmax ? newrepmax : null;

  try {
    const res = await setDoc(
      doc(
        db,
        `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.records}/lastrecord`
      ),
      {
        repmax: newrepmax,
        skill: updateSkill
          ? newSkill
          : lastactivity && lastactivity.skill
          ? lastactivity.skill
          : null,
        register: {
          [movementKey]: data[movementKey],
          [movementCategoryKey]: data[movementCategoryKey],
          [timeScoreKey]: data[timeScoreKey],
          [distanceScoreKey]: data[distanceScoreKey],
          scores: [
            {
              [dateKey]: Timestamp.fromDate(data[dateKey]),
              [weightKey]: parseFloat(data[weightKey]),
              [repsKey]: parseFloat(data[repsKey]),
              [setsKey]: parseFloat(data[setsKey]),
              [secondsKey]: parseFloat(data[secondsKey]),
              [distanceKey]: parseFloat(data[distanceKey]),
              [unitsKey]: data[unitsKey],
            },
          ],
          timestamps: {
            [createdAtKey]: Timestamp.fromDate(new Date()),
            [updatedAtKey]: Timestamp.fromDate(new Date()),
          },
        },
      }
    );

    if (callback) callback(res);
    return res;
  } catch (err) {
    console.log(err);
    if (callback) callback(err);
    throw err;
  }
};

export {
  getRecordsApi,
  getLatestActitvityApi,
  getSingleRecordApi,
  postRecordApi,
  updateRecordApi,
  updateLatestAcivityApi,
};
