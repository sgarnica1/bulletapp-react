import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getAllWodScoresApi = async (callback) => {
  try {
    const ref = collection(db, "wod_scores");
    const query_ = query(ref);
    const snapshot = await getDocs(query_);

    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (callback) callback(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const getWeeklyWodScoresApi = async (callback) => {
  // SET TODAY, YESTERDAY, SUNDAY TO OBTAIN MONDAY THROUGH YESTERDAYS WODS
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const yestedayRef = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const weekDay = yesterday.getDay();
  const diff = yesterday.getDate() - weekDay + (weekDay === 0 ? -6 : 0);
  const sunday = new Date(yesterday.setDate(diff));

  try {
    const ref = collection(db, info.firebase.collections.wodScores);
    const query_ = query(
      ref,
      where("timestamps.created_at", "<", yestedayRef),
      where("timestamps_created_at", ">", sunday)
    );
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (callback) callback(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const getWodScoresByWodIdApi = async (idWod, callback) => {
  try {
    const ref = collection(
      db,
      `/${info.firebase.collections.wods}/${idWod}/${info.firebase.subcollections.wods.scores}`
    );
    const snapshot = await getDocs(ref);
    // console.log(snapshot.docs.map((doc) => doc.data()));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (callback) callback(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const getWodScoreByUserIdApi = async (idWod, idUser, callback) => {
  try {
    const ref = collection(db, info.firebase.collections.wodScores);
    const query_ = query(
      ref,
      where("id_wod", "==", idWod),
      where("id_user", "==", idUser)
    );
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (callback) callback(data);
    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getWodWithWodScoresByDateApi = async (date, callback) => {
  const yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000);

  // VERIFY IF DATE IS A WEEKEND DAY
  if (date.getDay() === 0 || date.getDay() === 6) return null;

  // GET WOD
  try {
    const ref = collection(db, info.firebase.collections.wods);
    const query_ = query(ref, where("date", ">=", yesterday));
    const snapshot = await getDocs(query_);

    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (callback) callback(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const postWodScoreApi = async (idWod, data, callback) => {
  try {
    const res = await addDoc(
      collection(
        db,
        `/${info.firebase.collections.wods}/${idWod}/${info.firebase.subcollections.wods.scores}`
      ),
      {
        // ID USER
        [info.firebase.docKeys.wodScores.uid]: data.uid,
        // USERNAME
        [info.firebase.docKeys.wodScores.username]: data.username,
        // SCORE
        [info.firebase.docKeys.wodScores.score]: data.score,
        // TIMESTAMPS
        timestamps: {
          [info.firebase.docKeys.wodScores.timestamps.createdAt]:
            Timestamp.fromDate(new Date()),
          [info.firebase.docKeys.wodScores.timestamps.updatedAt]:
            Timestamp.fromDate(new Date()),
        },
      }
    );
    if (callback) callback(res);
    return res.id;
  } catch (err) {
    throw err;
  }
};

const updateWodScoreApi = async (idWod, idWodScore, score, callback) => {
  try {
    const ref = doc(
      db,
      `/${info.firebase.collections.wods}/${idWod}/${info.firebase.subcollections.wods.scores}/${idWodScore}`
    );
    const res = await updateDoc(ref, {
      [info.firebase.docKeys.wodScores.score]: score,
    });
    if (callback) callback(res);
    console.log(res);
    return res;
  } catch (err) {
    throw err;
  }
};

export {
  getAllWodScoresApi,
  getWeeklyWodScoresApi,
  getWodScoreByUserIdApi,
  getWodScoresByWodIdApi,
  getWodWithWodScoresByDateApi,
  postWodScoreApi,
  updateWodScoreApi,
};
