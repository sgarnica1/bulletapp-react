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
const dateKey = [info.firebase.docKeys.records.scores.date];
const weightKey = [info.firebase.docKeys.records.scores.weight];
const repsKey = [info.firebase.docKeys.records.scores.reps];
const setsKey = [info.firebase.docKeys.records.scores.sets];
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
      if (doc.id == "lastrepmax") lastrepmaxIndex = index;
      return { id: doc.id, ...doc.data() };
    });

    const lastrepmax = data.splice(lastrepmaxIndex, 1);

    if (callback) callback(data);
    return [data, lastrepmax[0]];
  } catch (err) {
    console.log(err);
  }
};

const getLastRepMaxApi = async (idUser, callback) => {
  try {
    const ref = doc(
      db,
      `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.records}/lastrepmax`
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
    if (snapshot.data() == undefined) return -1;
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
        // MOVEMENT
        [info.firebase.docKeys.records.movement]:
          data[info.firebase.docKeys.records.movement],
        // MOVEMENT CATEGORY
        [info.firebase.docKeys.records.movementCategory]:
          data[info.firebase.docKeys.records.movementCategory],
        // TIMESCORE
        [info.firebase.docKeys.records.timescore]:
          data[info.firebase.docKeys.records.timescore],
        // SCORE
        scores: [
          {
            [info.firebase.docKeys.records.scores.date]: Timestamp.fromDate(
              data[info.firebase.docKeys.records.scores.date]
            ),
            [info.firebase.docKeys.records.scores.weight]: parseFloat(
              data[info.firebase.docKeys.records.scores.weight]
            ),
            [info.firebase.docKeys.records.scores.reps]: parseFloat(
              data[info.firebase.docKeys.records.scores.reps]
            ),
            [info.firebase.docKeys.records.scores.sets]: parseFloat(
              data[info.firebase.docKeys.records.scores.sets]
            ),
            [info.firebase.docKeys.records.scores.seconds]: parseFloat(
              data[info.firebase.docKeys.records.scores.seconds]
            ),
            [info.firebase.docKeys.records.scores.units]:
              data[info.firebase.docKeys.records.scores.units],
          },
        ],
        // TIMESTAMPS
        timestamps: {
          [info.firebase.docKeys.wodScores.timestamps.createdAt]:
            Timestamp.fromDate(new Date()),
          [info.firebase.docKeys.wodScores.timestamps.updatedAt]:
            Timestamp.fromDate(new Date()),
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
        [info.firebase.docKeys.records.scores.date]: Timestamp.fromDate(
          data[info.firebase.docKeys.records.scores.date]
        ),
        [info.firebase.docKeys.records.scores.weight]: parseFloat(
          data[info.firebase.docKeys.records.scores.weight]
        ),
        [info.firebase.docKeys.records.scores.reps]: parseFloat(
          data[info.firebase.docKeys.records.scores.reps]
        ),
        [info.firebase.docKeys.records.scores.sets]: parseFloat(
          data[info.firebase.docKeys.records.scores.sets]
        ),
        [info.firebase.docKeys.records.scores.seconds]: parseFloat(
          data[info.firebase.docKeys.records.scores.seconds]
        ),
        [info.firebase.docKeys.records.scores.units]:
          data[info.firebase.docKeys.records.scores.units],
      }),
    });
    if (callback) callback(res);
    console.log(res);
    return res;
  } catch (err) {
    if (callback) callback(err);
    throw err;
  }
};

const updateLatestRepMaxApi = async (idUser, data, callback) => {
  const lastrepmax = await getLastRepMaxApi(idUser);
  if (lastrepmax && lastrepmax[weightKey] > data[weightKey]) return;

  try {
    const res = await setDoc(
      doc(
        db,
        `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.records}/lastrepmax`
      ),
      // DATA
      {
        // MOVEMENT
        [movementKey]: data[movementKey],
        // DATE
        [dateKey]: Timestamp.fromDate(data[dateKey]),
        // WEIGHT
        [weightKey]: parseFloat(data[weightKey]),
        // UNITS
        [unitsKey]: data[unitsKey],
      }
    );

    if (callback) callback(res);
    console.log(res);
    return res;
  } catch (err) {
    if (callback) callback(err);
    throw err;
  }
};

export {
  getRecordsApi,
  getLastRepMaxApi,
  getSingleRecordApi,
  postRecordApi,
  updateRecordApi,
  updateLatestRepMaxApi,
};
