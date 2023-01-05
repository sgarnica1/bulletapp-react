import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  limit,
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
  const todayRef = new Date()
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const yestedayRef = new Date(today.getTime() - 24 * 60 * 60 * 1000);
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
    const query_ = query(ref, where("date", ">", yesterday));
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

export { getAllWodsApi, getWeeklyWodsApi, getTodaysWodApi };
