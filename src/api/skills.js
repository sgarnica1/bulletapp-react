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

const getSkillsApi = async (idUser, callback) => {
  try {
    const ref = collection(
      db,
      `${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.unlockedSkills}`
    );
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    if (callback) callback(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getSingleSkillApi = async (idUser, idSkill, callback) => {
  try {
    const ref = doc(db, "/users/" + idUser + "/skills/" + idSkill);
    const snapshot = await getDoc(ref);
    if (callback) callback(snapshot.data());
    if (snapshot.data() == undefined) return -1;
    return snapshot.data();
  } catch (err) {
    console.log(err);
  }
};

const postSkillApi = async (idUser, data, callback) => {
  console.log("addskill", data);
  try {
    const res = await addDoc(
      collection(
        db,
        `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.unlockedSkills}`
      ),
      {
        // ID MOVEMENT
        [info.firebase.docKeys.skills.idMovement]:
          data[info.firebase.docKeys.skills.idMovement],
        // MOVEMENT
        [info.firebase.docKeys.skills.movement]:
          data[info.firebase.docKeys.skills.movement],
        // MOVEMENT CATEGORY
        [info.firebase.docKeys.skills.movementCategory]:
          data[info.firebase.docKeys.skills.movementCategory],
        // DATE
        [info.firebase.docKeys.skills.date]: Timestamp.fromDate(
          data[info.firebase.docKeys.skills.date]
        ),
        // TIMESTAMPS
        timestamps: {
          [info.firebase.docKeys.skills.timestamps.createdAt]:
            Timestamp.fromDate(new Date()),
          [info.firebase.docKeys.skills.timestamps.updatedAt]:
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

export { getSkillsApi, getSingleSkillApi, postSkillApi };
