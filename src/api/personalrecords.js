import {
  collection,
  getDocs,
  query,
  addDoc,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getPersonalRecordsApi = async (idUser, callback) => {
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

const postPersonalRecordApi = async (idUser, data, callback) => {
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
        // ID MOVEMENT
        scores: {
          [info.firebase.docKeys.personalRecords.scores.date]:
            Timestamp.fromDate(new Date()),
          [info.firebase.docKeys.personalRecords.scores.value]:
            data[info.firebase.docKeys.personalRecords.scores.value],
        },
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
    console.log(err);
    throw err;
  }
};

export { getPersonalRecordsApi, postPersonalRecordApi };
