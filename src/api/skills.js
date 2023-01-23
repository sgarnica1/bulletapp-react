import {
  doc,
  getDoc,
  Timestamp,
  setDoc,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getSkillsByUserIdApi = async (idUser, callback) => {
  try {
    const ref = doc(
      db,
      `${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.unlockedSkills}/unlocked`
    );
    const snapshot = await getDoc(ref);
    const data = snapshot.data();

    if (callback) callback(data);
    if (data === undefined) return -1;
    return data.skills;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getSkillsNameListByUserIdApi = async (idUser, callback) => {
  try {
    const ref = doc(
      db,
      `${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.unlockedSkills}/unlocked`
    );
    const snapshot = await getDoc(ref);
    const data = snapshot.data();

    if (callback) callback(data);
    if (data === undefined) return [];
    return data.skills.map((skill) => skill.movement);
  } catch (err) {
    console.log(err);
  }
};

const postSkillApi = async (idUser, data, callback) => {
  console.log("addskill", data);
  const res = await getSkillsByUserIdApi(idUser);

  const newSkill = {
    // MOVEMENT
    [info.firebase.docKeys.skills.movement]:
      data[info.firebase.docKeys.skills.movement],
    // MOVEMENT CATEGORY
    [info.firebase.docKeys.skills.movementId]:
      data[info.firebase.docKeys.skills.movementId],
    // DATE
    [info.firebase.docKeys.skills.date]: Timestamp.fromDate(
      data[info.firebase.docKeys.skills.date]
    ),
  };

  let newUnlocked = res === -1 ? [newSkill] : [...res, newSkill];

  try {
    const res = await setDoc(
      doc(
        db,
        `/${info.firebase.collections.users}/${idUser}/${info.firebase.subcollections.users.unlockedSkills}/unlocked`
      ),
      {
        [info.firebase.docKeys.skills.key]: newUnlocked,
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

export { getSkillsByUserIdApi, getSkillsNameListByUserIdApi, postSkillApi };
