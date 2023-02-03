import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

// Firebase Keys
const activeKey = info.firebase.docKeys.wods.active;
const titleKey = info.firebase.docKeys.wods.title;
const descriptionKey = info.firebase.docKeys.wods.description;
const timecapKey = info.firebase.docKeys.wods.timecap;
const categoryKey = info.firebase.docKeys.wods.category;
const dateKey = info.firebase.docKeys.wods.date;
const repsKey = info.firebase.docKeys.wods.reps;
const roundsKey = info.firebase.docKeys.wods.rounds;
const timeScoreKey = info.firebase.docKeys.wods.timescore;
const teamsKey = info.firebase.docKeys.wods.teams;

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

const getWodCategoriesApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.wodCategories);
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
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
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  // Verify if it is saturday or sunday
  if (today.getDay() === 0 || today.getDay() === 6) return -1;

  try {
    const ref = collection(db, info.firebase.collections.wods);
    const query_ = query(
      ref,
      where("date", ">=", today),
      where("date", "<", tomorrow)
    );
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      const date = new Date(doc.data().date.seconds * 1000);
      return { id: doc.id, locale_date: date, ...doc.data() };
    });

    // Verify if there is a wod for today, if not return -1
    if (data.length === 0) return -1;

    if (callback) callback(data);
    return data[0];
  } catch (err) {
    throw err;
  }
};

const getWodByDateApi = async (date, callback) => {
  const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  date.setHours(0, 0, 0, 0);

  // VERIFY IF TODAY IS A WEEKEND
  if (date.getDay() === 0 || date.getDay() === 6) return -1;

  // GET WOD
  try {
    const ref = collection(db, info.firebase.collections.wods);
    const query_ = query(
      ref,
      where("date", ">=", date),
      where("date", "<", tomorrow)
    );
    const snapshot = await getDocs(query_);

    let data = [];

    snapshot.docs.map((doc) => {
      const woddate = new Date(doc.data().date.seconds * 1000);
      // Get the wod for the date
      if (woddate.getDate() === date.getDate())
        data.push({ id: doc.id, locale_date: woddate, ...doc.data() });
      return doc.data();
    });

    // Verify if there is a wod for today, if not return -1
    if (data.length === 0 || data[0].length === 0) return -1;

    if (callback) callback(data);
    return data[0];
  } catch (err) {
    throw err;
  }
};

const getWodByIdApi = async (id, callback) => {
  try {
    const ref = doc(db, info.firebase.collections.wods, id);
    const docSnap = await getDoc(ref);
    if (!docSnap.exists()) return -1;

    const data = { id: docSnap.id, ...docSnap.data() };
    if (callback) callback(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const postWodApi = async (wodData, callback) => {
  const date = new Date(wodData.date);
  date.setHours(0, 0, 0, 0);

  try {
    const ref = collection(db, info.firebase.collections.wods);
    const docRef = await addDoc(ref, {
      [activeKey]: true,
      [dateKey]: Timestamp.fromDate(date),
      [titleKey]: wodData[titleKey],
      [descriptionKey]: wodData[descriptionKey],
      [categoryKey]: wodData[categoryKey],
      [timecapKey]: wodData[timecapKey],
      [timeScoreKey]: wodData[timeScoreKey],
      [teamsKey]: wodData[teamsKey],
      [repsKey]: wodData[repsKey],
      [roundsKey]: wodData[roundsKey],
      timestamps: {
        // TIMESTAMPS
        [info.firebase.docKeys.wods.timestamps.createdAt]: Timestamp.fromDate(
          new Date()
        ),
        [info.firebase.docKeys.wods.timestamps.updatedAt]: Timestamp.fromDate(
          new Date()
        ),
      },
    });
    if (callback) callback();
    return docRef.id;
  } catch (err) {
    if (callback) callback(err);
    throw err;
  }
};

const updateWodApi = async (idWod, wodData, callback) => {
  const date = new Date(wodData.date);
  date.setHours(0, 0, 0, 0);

  try {
    const ref = doc(db, `/${info.firebase.collections.wods}/${idWod}`);
    const res = await updateDoc(ref, {
      [dateKey]: Timestamp.fromDate(date),
      [titleKey]: wodData[titleKey],
      [descriptionKey]: wodData[descriptionKey],
      [categoryKey]: wodData[categoryKey],
      [timecapKey]: wodData[timecapKey],
      [timeScoreKey]: wodData[timeScoreKey],
      [teamsKey]: wodData[teamsKey],
      [repsKey]: wodData[repsKey],
      [roundsKey]: wodData[roundsKey],
      timestamps: {
        [info.firebase.docKeys.wods.timestamps.updatedAt]: Timestamp.fromDate(
          new Date()
        ),
      },
    });
    if (callback) callback(res);
    return res;
  } catch (err) {
    if (callback) callback(err);
    console.log(err);
    throw err;
  }
};

export {
  getAllWodsApi,
  getWeeklyWodsApi,
  getTodaysWodApi,
  getWodByDateApi,
  getWodByIdApi,
  getWodCategoriesApi,
  postWodApi,
  updateWodApi,
};
