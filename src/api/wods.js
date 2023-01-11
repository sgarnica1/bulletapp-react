import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getAllWodsApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.wods);
    const query_ = query(ref);
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      const date = new Date(doc.data().date.seconds * 1000);
      return { id: doc.id, locale_date: date, ...doc.data() };
    });
    if (callback) callback(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const getWeeklyWodsApi = async (callback) => {
  // SET TODAY, YESTERDAY, SUNDAY TO OBTAIN MONDAY THROUGH YESTERDAYS WODS
  const today = new Date();
  const todayRef = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const weekDay = yesterday.getDay();
  const diff = yesterday.getDate() - weekDay + (weekDay === 0 ? -6 : 0);
  const sunday = new Date(yesterday.setDate(diff));

  try {
    const ref = collection(db, info.firebase.collections.wods);
    const query_ = query(
      ref,
      where("date", "<=", todayRef),
      where("date", ">", sunday)
    );
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      const date = new Date(doc.data().date.seconds * 1000);

      return { id: doc.id, locale_date: date, ...doc.data() };
    });
    if (callback) callback(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const getTodaysWodApi = async (callback) => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  // VERIFY IF TODAY IS A WEEKEND
  if (today.getDay() === 0 || today.getDay() === 6) return -1;

  try {
    const ref = collection(db, info.firebase.collections.wods);
    const query_ = query(ref, where("date", ">=", yesterday));
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      const date = new Date(doc.data().date.seconds * 1000);
      return { id: doc.id, locale_date: date, ...doc.data() };
    });
    // VERIFY IF THERE IS A WOD FOR TODAY
    if (data.length === 0) return -1;
    // GET SCORE TYPE NAME
    const scoreTypeData = await getWodTypeApi(data[0].id_score_type);
    data[0].score_type = scoreTypeData;
    if (callback) callback(data);
    return data[0];
  } catch (err) {
    throw err;
  }
};

const getWodByDateApi = async (date, callback) => {
  date.setHours(0, 0, 0, 0);

  // VERIFY IF TODAY IS A WEEKEND
  if (date.getDay() === 0 || date.getDay() === 6) return null;

  // GET WOD
  try {
    const ref = collection(db, info.firebase.collections.wods);
    const query_ = query(ref, where("date", ">=", date));
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      const date = new Date(doc.data().date.seconds * 1000);
      return { id: doc.id, locale_date: date, ...doc.data() };
    });
    // VERIFY IF THERE IS A WOD FOR TODAY
    if (data.length === 0 || data[0].length === 0) return null;

    // GET SCORE TYPE NAME
    const scoreTypeData = await getWodTypeApi(data[0].id_score_type);
    data[0].score_type = scoreTypeData;
    if (callback) callback(data);
    // console.log(data);
    return data[0];
  } catch (err) {
    throw err;
  }
};

const getWodTypeApi = async (idScoreType) => {
  try {
    const ref = doc(db, info.firebase.collections.scoreTypes, idScoreType);
    const snapshot = await getDoc(ref);
    return snapshot.data().name;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const postWodApi = async (wodData, callback) => {
  const date = new Date(wodData.date);
  date.setHours(0, 0, 0, 0);

  try {
    const ref = collection(db, info.firebase.collections.wods);
    const docRef = await addDoc(ref, {
      [info.firebase.docKeys.wods.active]: true, // ACTIVE
      [info.firebase.docKeys.wods.date]: Timestamp.fromDate(date), // DATE
      [info.firebase.docKeys.wods.description]:
        wodData[info.firebase.docKeys.wods.description], // DESCRIPTION
      [info.firebase.docKeys.wods.idScoreType]:
        wodData[info.firebase.docKeys.wods.idScoreType], // SCORE TYPE
      [info.firebase.docKeys.wods.timecap]:
        wodData[info.firebase.docKeys.wods.timecap], // SCORE TYPE
      timestamps: {
        // TIMESTAMPS
        [info.firebase.docKeys.wodScores.timestamps.createdAt]:
          Timestamp.fromDate(new Date()),
        [info.firebase.docKeys.wodScores.timestamps.updatedAt]:
          Timestamp.fromDate(new Date()),
      },
    });
    if (callback) callback();
    return docRef.id;
  } catch (err) {
    if (callback) callback(err);
    throw err;
  }
};

export {
  getAllWodsApi,
  getWeeklyWodsApi,
  getTodaysWodApi,
  getWodByDateApi,
  postWodApi,
};
