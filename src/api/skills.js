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
  setDoc,
} from "firebase/firestore/lite";
import { db, auth } from "../firebase/index";
import { info } from "../utils/info";

const getSkillsByUserIdApi = async (idUser, callback) => {
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

const getSkillsNameListByUserIdApi = async (idUser, callback) => {
  try {
    const ref = collection(
      db,
      `${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.unlockedSkills}`
    );
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => doc.data().movement);

    if (callback) callback(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getUserSkillByIdApi = async (idUser, idSkill, callback) => {
  try {
    const ref = doc(
      db,
      `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.unlockedSkills}/${idSkill}`
    );
    const snapshot = await getDoc(ref);
    if (callback) callback(snapshot.data());
    if (snapshot.data() == undefined) return -1;
    return snapshot.data();
  } catch (err) {
    console.log(err);
  }
};

const postSkillApi = async (idUser, idMov, data, callback) => {
  console.log("addskill", data);
  try {
    const res = await setDoc(
      doc(
        db,
        `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.unlockedSkills}/${idMov}`
      ),
      {
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

export {
  getSkillsByUserIdApi,
  getSkillsNameListByUserIdApi,
  getUserSkillByIdApi,
  postSkillApi,
};
