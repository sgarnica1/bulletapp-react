import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  addDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore/lite";
import { db, auth } from "../firebase/index";
import { info } from "../utils/info";

const getPRsApi = async (idUser, callback) => {
  try {
    const ref = collection(db, "/users/" + idUser + "/personal_records");
    const query_ = query(ref);
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    if (callback) callback(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getSinglePRApi = async (idUser, idPR, callback) => {
  try {
    const ref = doc(db, "/users/" + idUser + "/personal_records/" + idPR);
    const snapshot = await getDoc(ref);
    if (callback) callback(snapshot.data());
    if(snapshot.data() == undefined) return -1;
    return snapshot.data();
  } catch (err) {
    console.log(err);
  }
};

const postPRApi = async (idUser, data, callback) => {
  console.log("addpr", data);
  try {
    const res = await addDoc(
      collection(
        db,
        `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.personalRecords}`
      ),
      {
        // ID MOVEMENT
        [info.firebase.docKeys.personalRecords.idMovement]:
          data[info.firebase.docKeys.personalRecords.idMovement],
        // MOVEMENT
        [info.firebase.docKeys.personalRecords.movement]:
          data[info.firebase.docKeys.personalRecords.movement],
        // UNITS
        [info.firebase.docKeys.personalRecords.units]:
          data[info.firebase.docKeys.personalRecords.units],
        // MOVEMENT CATEGORY
        [info.firebase.docKeys.personalRecords.movementCategory]:
          data[info.firebase.docKeys.personalRecords.movementCategory],
        // SCORE TYPE
        [info.firebase.docKeys.personalRecords.score_type]:
          data[info.firebase.docKeys.personalRecords.score_type],
        // SCORE
        scores: [
          {
            [info.firebase.docKeys.personalRecords.scores.date]:
              Timestamp.fromDate(
                data[info.firebase.docKeys.personalRecords.scores.date]
              ),
            [info.firebase.docKeys.personalRecords.scores.value]: parseFloat(
              data[info.firebase.docKeys.personalRecords.scores.value]
            ),
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
    return res.id;
  } catch (err) {
    if (callback) callback(err);
    console.log(err);
    throw err;
  }
};

const updatePRApi = async (idUser, idPR, data, callback) => {
  try {
    const ref = doc(
      db,
      `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.personalRecords}/${idPR}`
    );
    const res = await updateDoc(ref, {
      scores: arrayUnion({
        [info.firebase.docKeys.personalRecords.scores.date]: Timestamp.fromDate(
          data[info.firebase.docKeys.personalRecords.scores.date]
        ),
        [info.firebase.docKeys.personalRecords.scores.value]: parseFloat(
          data[info.firebase.docKeys.personalRecords.scores.value]
        ),
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

export { getPRsApi, getSinglePRApi, postPRApi, updatePRApi };
